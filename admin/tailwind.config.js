/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#004282",
        black: "#333333",
        ash: "#757575",
      },
    },
  },
  plugins: [],
};
