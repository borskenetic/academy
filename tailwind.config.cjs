/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/views/**/*.blade.php', './resources/js/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#071735',
        navyDark: '#040D1A',
        navyLight: '#0B1E40',
        teal: { DEFAULT: '#007D79', dark: '#00615E', light: '#36D1C4', bg: '#E6F4F3' },
        gold: '#D4AF37',
        ink: '#122032',
        muted: '#536274',
        line: '#DBE5ED',
        soft: '#F3F8FB'
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}