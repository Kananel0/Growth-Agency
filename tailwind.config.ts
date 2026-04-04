import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink:'#060608', lime:'#C9FF47', ash:'#F5F5F0', mute:'#555560' },
      fontFamily: { display:['var(--font-syne)','sans-serif'], mono:['var(--font-dm-mono)','monospace'] },
      transitionDuration: { '400':'400ms' },
    },
  },
  plugins: [],
}
export default config
