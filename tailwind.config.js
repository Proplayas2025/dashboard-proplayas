// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    // agrega más rutas si es necesario
  ],
  theme: {
    extend: {
      colors: {
        'eastern-blue': {
          50:  '#eefdfd',
          100: '#d3f8fa',
          200: '#adf1f4',
          300: '#75e4eb',
          400: '#35cedb',
          500: '#19b1c1',
          600: '#188fa2',
          700: '#1a7384',
          800: '#1e5d6c',
          900: '#1d4f5c',
          950: '#0e343e',
        },
      },
    },
  },
  plugins: [],
};