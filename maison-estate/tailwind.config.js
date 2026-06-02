/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary:      '#1C1D1F',
        gold:         '#B48B5E',
        'gold-dim':   '#D4BFA6',
        'bg-main':    '#F9F8F6',
        'bg-card':    '#FFFFFF',
        'bg-alt':     '#F0EEE9',
        'text-main':  '#2D2E30',
        'text-muted': '#6B6861',
        border:       '#E8E6E1',
        green:        '#4A7C59',
        'green-lt':   '#5BA872',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)',   'system-ui', 'sans-serif'],
        mono:  ['var(--font-dm-mono)',   'monospace'],
      },
    },
  },
  plugins: [],
};
