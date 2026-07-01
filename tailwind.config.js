/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Korean body text renders with Pretendard; Kanit has no Hangul glyphs
        // and is reserved for large Latin display labels/numbers (design-ex.md).
        sans: ['Pretendard', 'Kanit', 'system-ui', 'sans-serif'],
        display: ['Kanit', 'Pretendard', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0C0C0C', // dark theme background
        mist: '#D7E2EA', // body / on-dark text
      },
    },
  },
  plugins: [],
}
