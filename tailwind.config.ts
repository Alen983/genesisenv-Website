import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        surface: '#171717',
        accent: '#00FF88',
        accentGold: '#E5B84C',
        accentCyan: '#22d3ee',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
