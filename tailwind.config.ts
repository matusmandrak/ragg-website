import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#640C0C', // Primary Background
        'brand-light': '#F0EBEB', // Primary Text (Soft White)
        'brand-muted': '#D1C7C7', // Secondary Text (Dimmer White)
        'brand-dark': '#1A1A1A', // Accent & Contrast (Near Black)
        'brand-white': '#FCFCFC', // For specific high-contrast sections
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
export default config
