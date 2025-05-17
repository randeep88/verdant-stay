/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "scroll-thumb": "10px", // Custom border-radius
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
