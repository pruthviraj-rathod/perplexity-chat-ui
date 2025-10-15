/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    theme: {
      extend: {
        colors: {
          teal: {
            500: '#14b8a6',
            600: '#0d9488',
          }
        },
        keyframes: {
          "fade-in": {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          "slide-in-from-left": {
            from: { transform: "translateX(-8px)" },
            to: { transform: "translateX(0)" },
          },
          bounce: {
            '0%, 100%': { 
              transform: 'translateY(-25%)', 
              animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
            },
            '50%': { 
              transform: 'translateY(0)', 
              animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
            },
          },
        },
        animation: {
          "fade-in": "fade-in 200ms cubic-bezier(0.16, 1, 0.3, 1)",
          "slide-in-from-left": "slide-in-from-left 200ms cubic-bezier(0.16, 1, 0.3, 1)",
          "in": "fade-in 200ms, slide-in-from-left 200ms",
        },
      },
    },
    plugins: [],
  }