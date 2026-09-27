/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#111111',
        panel: '#1a1a1a',
        panelStrong: '#202020',
        accent: '#D97757',
        muted: '#a3a3a3',
        soft: '#ededed',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
