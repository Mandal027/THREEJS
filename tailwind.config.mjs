/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        foreground: "var(--foreground)",
        TextColor: "0x3B0014"
      },

      fontFamily: {
        sans: ['ChakraPetch', 'sans-serif'],
        sketch: ['sketch', 'cursive'],
        handodle: ['Handodle', 'cursive'],
        roashe: ['Roashe', 'serif'],
      },

      theme: {
        fontWeight: {
          thin: '100',
          hairline: '100',
          extralight: '200',
          light: '300',
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
          extrabold: '800',
          'extra-bold': '800',
          black: '900',
        }
      }
    },
  },
  plugins: [],
};
