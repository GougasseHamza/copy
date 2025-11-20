/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        nature: {
          50: 'hsl(var(--nature-50))',
          100: 'hsl(var(--nature-100))',
          200: 'hsl(var(--nature-200))',
          300: 'hsl(var(--nature-300))',
          400: 'hsl(var(--nature-400))',
          500: 'hsl(var(--nature-500))',
          600: 'hsl(var(--nature-600))',
          700: 'hsl(var(--nature-700))',
          800: 'hsl(var(--nature-800))',
          900: 'hsl(var(--nature-900))',
        },
        earth: {
          50: 'hsl(var(--earth-50))',
          100: 'hsl(var(--earth-100))',
          200: 'hsl(var(--earth-200))',
          300: 'hsl(var(--earth-300))',
          400: 'hsl(var(--earth-400))',
          500: 'hsl(var(--earth-500))',
          600: 'hsl(var(--earth-600))',
          700: 'hsl(var(--earth-700))',
          800: 'hsl(var(--earth-800))',
          900: 'hsl(var(--earth-900))',
        },
        beige: {
          50: 'hsl(var(--beige-50))',
          100: 'hsl(var(--beige-100))',
          200: 'hsl(var(--beige-200))',
          300: 'hsl(var(--beige-300))',
          400: 'hsl(var(--beige-400))',
          500: 'hsl(var(--beige-500))',
          600: 'hsl(var(--beige-600))',
          700: 'hsl(var(--beige-700))',
          800: 'hsl(var(--beige-800))',
          900: 'hsl(var(--beige-900))',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
