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
        background: "#131312",
        paper: {
          DEFAULT: "#171717",
          secondary: "#282828",
        },
        white: "#FEFFFE",
        purple: "#531640",
        player: "#181818",
        primary: "#1DB954",
        gray: {
          secondary: "#535353",
          DEFAULT: "#B2B2B3",
        },
      },
    },
  },
  plugins: [],
};
