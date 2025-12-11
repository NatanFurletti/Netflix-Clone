/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    // Adicione outros caminhos se necessário
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas para Netflix Clone
        netflix: {
          red: "#E50914",
          black: "#141414",
          gray: "#808080",
          "light-gray": "#E5E5E5",
        },
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gradient-to-b":
          "linear-gradient(to bottom, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 0.15) 15%, rgba(20, 20, 20, 0.35) 29%, rgba(20, 20, 20, 0.58) 44%, #141414 68%, #141414 100%)",
      },
    },
  },
  plugins: [],
};
