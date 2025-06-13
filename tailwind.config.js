/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Fustat', 'system-ui', 'sans-serif'],
      fustat: ['Fustat', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        heading: ['Fustat', 'system-ui', 'sans-serif'],
        body: ['Fustat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
