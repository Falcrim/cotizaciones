/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // This helps prevent oklab/oklch generation in some environments
  // although v4 is mostly CSS-driven, explicitly defining colors helps
  corePlugins: {
    preflight: true,
  }
}
