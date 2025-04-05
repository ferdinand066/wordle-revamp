/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Adjust as needed
  ],
  safelist: [
    {
      pattern: /grid-cols-(\d+)/, // this will match grid-cols-1 to grid-cols-999+
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
