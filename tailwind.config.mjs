/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        valorant: { DEFAULT: "#ff4655", dark: "#0f1923", light: "#ece8e1" },
      },
    },
  },
  plugins: [],
};
