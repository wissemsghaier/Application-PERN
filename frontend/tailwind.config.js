/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        "pacific" : ["Pacifico", 'sans-serif']
      }
    },
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        softBlue: "#e0f2fe",
        softGray: "#f1f5f9",
        softPurple: "#ede9fe",
        softGreen: "#dcfce7",
      },
    },
  },
  plugins: [],
}

