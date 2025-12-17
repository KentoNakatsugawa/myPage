import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        norel: {
          green: '#00A040',
          'green-dark': '#008030',
          'green-light': '#E8F5E9',
        },
        line: {
          green: '#06C755',
        },
      },
    },
  },
  plugins: [],
}
export default config
