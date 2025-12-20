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
          blue: '#0375C7',
          'blue-dark': '#0262A3',
          'blue-light': '#E3F2FD',
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
        // Ethereal Flow - Glass Colors
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          'white-20': 'rgba(255, 255, 255, 0.2)',
          'white-50': 'rgba(255, 255, 255, 0.5)',
          'white-80': 'rgba(255, 255, 255, 0.8)',
          dark: 'rgba(0, 0, 0, 0.1)',
          'dark-20': 'rgba(0, 0, 0, 0.2)',
        },
      },
      boxShadow: {
        'norel': '0 4px 14px 0 rgba(0, 160, 64, 0.3)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'modal': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
        // Ethereal Flow - Glow Shadows
        'glow': '0 0 20px rgba(255, 255, 255, 0.3)',
        'glow-green': '0 0 30px rgba(0, 160, 64, 0.4)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.4)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-blue': '0 0 30px rgba(3, 117, 199, 0.4)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 16px 48px 0 rgba(31, 38, 135, 0.2)',
        'float': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
        'inner-glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
      fontSize: {
        'score': ['3rem', { lineHeight: '1', fontWeight: '900' }],
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 1.5s ease-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 160, 64, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 160, 64, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        // Ethereal Flow - Gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-ethereal': 'linear-gradient(135deg, rgba(0, 160, 64, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(3, 117, 199, 0.1) 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-orb-1': 'radial-gradient(circle, rgba(0, 160, 64, 0.3) 0%, transparent 70%)',
        'gradient-orb-2': 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
        'gradient-orb-3': 'radial-gradient(circle, rgba(3, 117, 199, 0.2) 0%, transparent 70%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
export default config
