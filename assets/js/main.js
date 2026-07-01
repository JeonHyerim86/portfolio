/* =========================================================
   전혜림 포트폴리오 — main.js
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- 1. 헤더 스크롤 상태 ---------- */
  const header = document.getElementById("siteHeader");
  const onScrollHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
  onScrollHeader();

  /* ---------- 2. 모바일 메뉴 토글 ---------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const closeNav = () => {
    primaryNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "메뉴 열기");
  };
  navToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  });
  primaryNav.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", closeNav)
  );

  /* ---------- 3. Scroll-spy (현재 섹션 네비 하이라이트) ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const setActive = (id) =>
    navLinks.forEach((l) => l.classList.toggle("active", l.dataset.nav === id));

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- 4. 스크롤 진입 reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revObserver.observe(el));
  }

  /* ---------- 5. 패럴랙스 (Hero) ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  let ticking = false;
  const updateParallax = () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const factor = parseFloat(el.dataset.parallax) || 0;
      el.style.transform = `translate3d(0, ${y * factor}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    onScrollHeader();
    if (!prefersReduced && parallaxEls.length && !ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 6. 마우스 추적 파티클 (Hero canvas) ---------- */
  const canvas = document.getElementById("heroCanvas");
  if (canvas && !prefersReduced && finePointer) {
    const ctx = canvas.getContext("2d");
    const hero = document.getElementById("home");
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = [];
    const MAX = 80;
    const mouse = { x: null, y: null };
    let inHero = true;

    const resize = () => {
      w = hero.offsetWidth;
      h = hero.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#5468ff", "#7c5cff", "#22d3ee", "#a5b4fc"];
    const spawn = (x, y) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 1,
          size: Math.random() * 2.4 + 1.2,
          color: colors[(Math.random() * colors.length) | 0],
        });
        if (particles.length > MAX) particles.shift();
      }
    };

    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      inHero = true;
      spawn(mouse.x, mouse.y);
    });
    hero.addEventListener("pointerleave", () => { inHero = false; });

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.018;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(p.life, 0) * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      // 커서 주변 연결선
      if (inHero && mouse.x !== null) {
        for (const p of particles) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.18 * p.life;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- 7. 프로젝트 상세 모달 ---------- */
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalPeriod = document.getElementById("modalPeriod");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");
  const dialog = modal.querySelector(".modal-dialog");
  let lastFocused = null;

  const openProject = (id) => {
    const trigger = document.querySelector(`[data-open-project="${id}"]`);
    if (!trigger) return;
    const card = trigger.closest(".project-card");
    const full = card.querySelector(".project-full");
    modalTitle.textContent = card.querySelector(".project-name").textContent;
    modalPeriod.textContent = card.querySelector(".project-period").textContent;
    modalContent.innerHTML = full.innerHTML;

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
    document.addEventListener("keydown", onModalKey);
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    modalContent.innerHTML = "";
    document.removeEventListener("keydown", onModalKey);
    if (lastFocused) lastFocused.focus();
  };

  const onModalKey = (e) => {
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key === "Tab") {
      const focusables = dialog.querySelectorAll(
        'button, a[href], img[tabindex], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  document.querySelectorAll("[data-open-project]").forEach((btn) =>
    btn.addEventListener("click", () => openProject(btn.dataset.openProject))
  );
  modalClose.addEventListener("click", closeModal);
  modal.querySelectorAll("[data-close-modal]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );

  /* ---------- 8. 이메일 복사 ---------- */
  const copyBtn = document.getElementById("copyEmail");
  const toast = document.getElementById("copyToast");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        toast.textContent = "✓ 이메일 주소가 복사되었습니다.";
      } catch {
        toast.textContent = email;
      }
      clearTimeout(copyBtn._t);
      copyBtn._t = setTimeout(() => (toast.textContent = ""), 2600);
    });
  }

  /* ---------- 연도 자동 갱신 ---------- */
  // (정적 연도 표기 유지 — 필요 시 동적 갱신 가능)
})();
