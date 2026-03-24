/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          red: '#E50914',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};
