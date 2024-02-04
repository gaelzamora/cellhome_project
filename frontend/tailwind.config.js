/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
        "50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a"},
        "bright-red": "hsl(12,88%,59%)",
        "dark-blue": "hsl(228,39%,23%)",
        "dark-grayish-blue": "hsl(227,12%,61%)",
        "very-dark-blue": "hsl(233, 12%, 13%)",
        "very-pale-red": "hsl(13,100%, 96%)",
        "vary-light-gray": "hsl(0,0%,98%)",
      },
      backgroundImage: {
        "close-menu": "url('./src/images/icon-close.svg')",
        "open-menu": "url('./src//images/icon-hamburger.svg')",
      }
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-animated')
  ],
}

