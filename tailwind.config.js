/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          secondary: "#050505",
        },
        paper: {
          700: "#121212",
          600: "#232323",
          500: "#181818",
          400: "#313131",
        },
        white: "#FEFFFE",
        purple: "#531640",
        primary: "#1ED760",
        gray: {
          DEFAULT: "#B3B3B3",
          dark: "#4D4D4D",
          light: "#AEAEAE",
        },
      },
    },
  },
  plugins: [],
};
