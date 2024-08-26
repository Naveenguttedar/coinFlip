/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        toss: {
          "0%,100%": { top: "0px", transoform: "rotateY(0deg) rotateX(0deg)" },
          "50%": {
            top: "-150px",
            transform: "rotateY(620deg) rotateX(620deg)",
          },
          "75%": {
            top: "-120px",
            transform: "rotateY(720deg) rotateX(720deg)",
          },
        },
      },
      animation: {
        toss: "toss 0.7s forwards ease-in-out",
      },
      colors: {
        _gray: "#1c1c1c",
        _bg_pink: "#C43883",
      },
    },
  },
  plugins: [],
};
