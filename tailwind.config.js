module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ["Segoe UI", "SF Pro Text", "Arimo", "system-ui"],
      'serif': ["Lora", "serif"],
      'mono': ["Inconsolata", "monospace"]
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
