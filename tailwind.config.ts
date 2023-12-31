import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Use 'class' for manual control
  theme: {
    extend: {
    
      fontSize: {
        'custom': '1em',
      },
      spacing: {
        '20vw': '20vw',
      },
    },
  },
  plugins: [],
}

export default config;