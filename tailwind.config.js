module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ["PT Sans", "system-ui"],
      'serif': ["PT Serif", "serif"],
      'mono': ["Inconsolata", "monospace"]
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
