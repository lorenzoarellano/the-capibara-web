import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        capibara: {
          950: '#010101',
          900: '#0a0a0a',
          800: '#151515',
          700: '#222222',
          600: '#333333',
          500: '#555555',
          400: '#888888',
          300: '#cecece',
          200: '#e0e0e0',
          100: '#f0f0f0',
          50: '#f8f8f8',
        },
        teal: {
          DEFAULT: '#0E7C7B',
          light: '#17BEBB',
          dark: '#0a5f5e',
        },
        mint: {
          DEFAULT: '#D4F4DD',
          dark: '#a8ddb5',
        },
        crimson: {
          DEFAULT: '#D62246',
          light: '#e84a6a',
          dark: '#b01a38',
        },
        plum: {
          DEFAULT: '#4B1D3F',
          light: '#6b2d5a',
          dark: '#35152d',
        },
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
