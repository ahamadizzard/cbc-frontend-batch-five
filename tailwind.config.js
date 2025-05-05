/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      backdropOpacity: {
        15: "0.15",
        20: "0.20",
        30: "0.30",
      },
      // Add the animation extensions for the login screen
      animation: {
        "gradient-shift": "gradient 8s ease infinite",
        "fade-in": "fadeIn 1s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
