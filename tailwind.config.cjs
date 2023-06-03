/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      larken: ['Larken', 'sans-serif'],
    },
    extend: {
      colors: {
        background: '#f0ece5',
        subtitlecard: '#9c8d7a',
        marron_fonce: '#2b2417',
        orange: '#cc9f5c',
      },
    },
  },
  plugins: [],
};
