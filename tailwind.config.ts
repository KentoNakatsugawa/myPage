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
        // NOREL Brand Colors
        norel: {
          green: '#00A040',
          'green-dark': '#008030',
          'green-light': '#E8F5E9',
        },
        // LINE App Colors
        line: {
          green: '#06C755',
          'green-dark': '#00B900',
          bg: '#7494C0',
          'bg-light': '#8BA4CC',
          header: '#4A6FA5',
          bubble: '#FFFFFF',
          'bubble-sent': '#06C755',
        },
        // Semantic UI Colors
        surface: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
          dark: '#D1D5DB',
        },
        // Status Colors
        status: {
          success: '#10B981',
          'success-light': '#D1FAE5',
          warning: '#F59E0B',
          'warning-light': '#FEF3C7',
          error: '#EF4444',
          'error-light': '#FEE2E2',
          info: '#3B82F6',
          'info-light': '#DBEAFE',
        },
        // Progress Colors
        progress: {
          orange: '#F97316',
          'orange-light': '#FB923C',
        },
      },
      boxShadow: {
        'norel': '0 4px 14px 0 rgba(0, 160, 64, 0.3)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'modal': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
      },
      fontSize: {
        'score': ['3rem', { lineHeight: '1', fontWeight: '900' }],
      },
    },
  },
  plugins: [],
}
export default config
