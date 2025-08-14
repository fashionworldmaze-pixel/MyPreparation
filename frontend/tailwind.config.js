/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          50: '#fff8e1',
          100: '#ffefc1',
          200: '#fde28a',
          300: '#f6ce4b',
          400: '#e9bb2f',
          500: '#d4af37',
          600: '#b89222',
          700: '#957418',
          800: '#785d16',
          900: '#624c15',
        },
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

