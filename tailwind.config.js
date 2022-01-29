module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ["Arimo", "sans-serif"],
      'serif': ["Lora", "serif"],
      'mono': ["Inconsolata", "monospace"]
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
