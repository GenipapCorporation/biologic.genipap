module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ["Segoe UI", "Open Sans", "system-ui"],
      'serif': ["Lora", "serif"],
      'mono': ["Roboto Mono", "monospace"]
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
