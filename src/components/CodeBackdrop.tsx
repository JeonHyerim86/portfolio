import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// 배경에서 코드가 한 글자씩 "타닥타닥" 타이핑되는 레이어.
// 화면(히어로)을 가득 채우면 지우고 처음부터 다시 입력한다.
// 내용은 전혜림의 실제 작업(이벤트 기반 알림 파이프라인 + 콜백, FCM 비동기 발송, 스레드 풀 튜닝)이라
// 배경 그 자체가 "백엔드 개발자"를 말한다.
// - 캐릭터/헤딩 뒤 배경(z-0)이라 저대비로 은은하게
// - prefers-reduced-motion: 타이핑 없이 한 화면 분량을 정적으로 표시

const MONO = "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace"
const CODE_COLOR = 'rgba(187, 204, 215, 0.34)' // #BBCCD7 — 빈 공간에선 읽히되 전경(헤딩/캐릭터)이 지배
const CURSOR_COLOR = 'rgba(190, 76, 0, 0.85)' // 포인트 그라디언트 계열 커서(#BE4C00)

// 실제 백엔드 코드 스니펫(그라운딩). 순서대로 이어붙여 스트림처럼 타이핑한다.
// 스토리: 주문 이벤트 발행 → 커밋 이후 비동기 리스너 → FCM 콜백(성공/실패) → 스레드 풀 튜닝.
// 라인을 길게 두어 화면 가로 폭을 넓게 채운다.
const SNIPPETS = [
  `@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public OrderResponse place(OrderRequest req) {
        Order order = orderRepository.save(Order.of(req.userId(), req.items(), req.couponCode()));
        // 알림은 도메인 이벤트로 분리 — 주문 트랜잭션과 결합하지 않는다
        eventPublisher.publishEvent(new OrderPlacedEvent(order.getId(), order.getUserId(), order.total()));
        return OrderResponse.from(order);
    }
}`,
  `// 결제 완료 도메인 이벤트 — 발행되면 커밋 이후 리스너가 소비한다
public record OrderPlacedEvent(Long orderId, Long userId, long amount) {}`,
  `@Slf4j
@Component
@RequiredArgsConstructor
public class OrderNotificationListener {
    private final FcmClient fcmClient;
    private final NotificationRepository notificationRepository;
    private final RetryScheduler retryScheduler;

    // 트랜잭션 커밋 이후에만 발송해 롤백 시 유령 알림을 막고, 발송은 별도 풀에서 비동기로
    @Async("notificationExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onOrderPlaced(OrderPlacedEvent event) {
        Notification noti = notificationRepository.save(Notification.of(event.userId(), NotiType.ORDER_PLACED, event.orderId()));
        fcmClient.sendAsync(noti.toPushMessage(), new PushCallback() {
            @Override public void onSuccess(String messageId) {
                noti.markDelivered(messageId);
                log.info("push delivered notiId={} messageId={}", noti.getId(), messageId);
            }
            @Override public void onFailure(Throwable cause) {
                noti.markFailed(cause.getMessage());
                retryScheduler.enqueue(noti.getId());
                log.warn("push failed notiId={} cause={} — retry enqueued", noti.getId(), cause.getMessage());
            }
        });
    }
}`,
  `// 발송 결과 콜백 — 성공/실패를 호출측 도메인 로직으로 되돌린다
public interface PushCallback {
    void onSuccess(String messageId);
    void onFailure(Throwable cause);
}

@Component
@RequiredArgsConstructor
public class FcmClient {
    private final FirebaseMessaging messaging;
    private final Executor notificationExecutor;

    // 블로킹 send() 대신 sendAsync() + 콜백으로 스레드를 붙잡지 않는다
    public void sendAsync(Message message, PushCallback callback) {
        ApiFutures.addCallback(messaging.sendAsync(message), new ApiFutureCallback<>() {
            @Override public void onSuccess(String messageId) { callback.onSuccess(messageId); }
            @Override public void onFailure(Throwable t) { callback.onFailure(t); }
        }, notificationExecutor);
    }
}`,
  `@Configuration
@EnableAsync
public class AsyncConfig {
    // 스레드 풀 튜닝 + 전송 비동기·논블로킹 전환 → 초당 최대 요청 250%↑, CPU 12%↓, TPS 50%↑
    @Bean("notificationExecutor")
    public Executor notificationExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(8);
        executor.setMaxPoolSize(32);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("noti-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }
}`,
]

const SOURCE = SNIPPETS.join('\n\n')

export default function CodeBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const codeRef = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const pre = preRef.current
    const code = codeRef.current
    if (!root || !pre || !code) return

    // 코드가 뷰포트 아래로 넘치면(=화면을 채우면) true
    const filled = () => pre.offsetHeight > root.clientHeight - 4

    // 모션 최소화: 화면 넘칠 때까지 채운 정적 텍스트 1회(타이핑 없음)
    if (reduce) {
      let text = ''
      for (let i = 0; i < SOURCE.length; i++) {
        text += SOURCE[i]
        code.textContent = text
        if (filled()) break
      }
      return
    }

    let i = 0
    let timer: ReturnType<typeof setTimeout>
    let stopped = false

    const step = () => {
      if (stopped) return
      // 화면을 채웠거나 소스 끝 → 잠깐 멈췄다가 처음부터 다시
      if (i >= SOURCE.length || filled()) {
        timer = setTimeout(() => {
          i = 0
          code.textContent = ''
          step()
        }, 1500)
        return
      }
      // 한 번에 1~2글자씩 처리해 "타닥타닥" 빠른 타건감 + 화면을 알맞게 채우는 속도
      const ch = SOURCE[i++]
      const burst = Math.random() < 0.5 ? 2 : 1
      let lastCh = ch
      code.textContent += ch
      for (let k = 1; k < burst && i < SOURCE.length; k++) {
        lastCh = SOURCE[i++]
        code.textContent += lastCh
      }
      // 기본 빠르게 + 약간의 흔들림, 줄바꿈/기호에서 잠깐 쉼
      let delay = 8 + Math.random() * 16
      if (lastCh === '\n') delay += 55
      else if (lastCh === '{' || lastCh === '}' || lastCh === ';') delay += 26
      else if (Math.random() < 0.04) delay += 90 // 가끔 생각하는 듯한 멈칫
      timer = setTimeout(step, delay)
    }

    // 폰트/레이아웃 안정화 후 시작
    timer = setTimeout(step, 400)
    return () => {
      stopped = true
      clearTimeout(timer)
    }
  }, [reduce])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      style={{
        // 상단(네비)·하단(슬로건/키워드)과 겹치지 않도록 위아래를 페이드
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 80%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 80%, transparent 100%)',
      }}
    >
      <pre
        ref={preRef}
        className="m-0 whitespace-pre-wrap break-words px-6 py-8 text-[12px] leading-[1.7] tracking-tight sm:px-10 sm:text-[14px]"
        style={{ fontFamily: MONO }}
      >
        <span ref={codeRef} style={{ color: CODE_COLOR }} />
        {!reduce && (
          <motion.span
            style={{ color: CURSOR_COLOR }}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
          >
            ▋
          </motion.span>
        )}
      </pre>
    </div>
  )
}
