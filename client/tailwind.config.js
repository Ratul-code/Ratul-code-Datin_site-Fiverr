/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a98046",
        // primary: "#ADD8E6",
        secondary:"#684007",
        // secondary:"#1769aa",
        main: "#FBFBFC",
        female:"#e72a53e3",
        tcolor: "rgb(128, 129, 145)",
      },
    },
  },
  plugins: [],
}
