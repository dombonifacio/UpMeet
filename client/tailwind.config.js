/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vader: "#040314",
        light: "#869CFF",
        electric: "#443BDA",
        fiery: "#B32BD6",
        input: "#2A2B54",
        lavender: "#4c49c9",
        electric: "#B7C4FF",
        borderInput: "#414865",
        cardText: "#ADBCFF",
      },
    },
  },
  plugins: [],
};
