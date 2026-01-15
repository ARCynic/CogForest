/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "star-movement-bottom": "star-movement-bottom 6s linear infinite alternate",
        "star-movement-top": "star-movement-top 6s linear infinite alternate",
         'ghost-manta-right': 'ghost-manta-drift-right 40s ease-in-out infinite',
        'ghost-manta-left': 'ghost-manta-drift-left 40s ease-in-out infinite',
        'ghost-manta-undulate': 'ghost-manta-undulate 6s ease-in-out infinite',
      },
      keyframes: {
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
         'ghost-manta-drift-right': {
          '0%': {
            transform: 'translate3d(-30vw, 10vh, 0) scale(0.9)',
            opacity: '0',
          },
          '10%': {
            opacity: '0.45',
          },
          '50%': {
            transform: 'translate3d(0, 0, 0) scale(1.0)',
            opacity: '0.7',
          },
          '90%': {
            opacity: '0.3',
          },
          '100%': {
            transform: 'translate3d(30vw, -8vh, 0) scale(1.05)',
            opacity: '0',
          },
        },
        'ghost-manta-drift-left': {
          '0%': {
            transform: 'translate3d(30vw, 10vh, 0) scale(0.9)',
            opacity: '0',
          },
          '10%': {
            opacity: '0.45',
          },
          '50%': {
            transform: 'translate3d(0, 0, 0) scale(1.0)',
            opacity: '0.7',
          },
          '90%': {
            opacity: '0.3',
          },
          '100%': {
            transform: 'translate3d(-30vw, -8vh, 0) scale(1.05)',
            opacity: '0',
          },
        },
        'ghost-manta-undulate': {
          '0%':   { transform: 'translateY(0px) scaleY(1)' },
          '25%':  { transform: 'translateY(-2px) scaleY(0.98)' },
          '50%':  { transform: 'translateY(-4px) scaleY(1.02)' },
          '75%':  { transform: 'translateY(-2px) scaleY(0.99)' },
          '100%': { transform: 'translateY(0px) scaleY(1)' },
        },
      
      },
    },
  },
  plugins:  [],
};
