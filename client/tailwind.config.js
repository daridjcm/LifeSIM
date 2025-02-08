import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'move-up-down': 'moveUpDown 2s ease-in-out infinite',
        'appear-from-bottom': 'appearFromBottom 1.1s ease-out',
        'appear-from-left': 'appearFromLeft 1s ease-out',
      },
      keyframes: {
        moveUpDown: {
          '0%': { transform: 'translateY(0)', opacity: '100%' },
          '50%': { transform: 'translateY(-20px)', opacity: '70%' },
          '100%': { transform: 'translateY(0)', opacity: '100%' },
        },
        appearFromBottom: {
          '0%': { opacity: '0%', transform: 'translateY(50px)' },
          '100%': { opacity: '100%', transform: 'translateY(0)' },
        },
        appearFromLeft: {
          '0%': { opacity: '0%', transform: 'translateX(-50px)' },
          '100%': { opacity: '100%', transform: 'translateX(0)' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
