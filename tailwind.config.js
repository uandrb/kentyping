/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'gradient-main': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      backgroundImage: {
        'gradient-menu': 'linear-gradient(to bottom right, #667eea, #764ba2, #f093fb, #f5576c)',
        'gradient-levels': 'linear-gradient(to bottom right, #a855f7, #9333ea, #ec4899)',
        'gradient-typing': 'linear-gradient(to bottom right, #06b6d4, #3b82f6, #8b5cf6)',
        'gradient-games': 'linear-gradient(to bottom right, #10b981, #06b6d4, #3b82f6)',
        'gradient-practice': 'linear-gradient(to bottom right, #f97316, #f59e0b, #ec4899)',
        'gradient-stats': 'linear-gradient(to bottom right, #ec4899, #a855f7, #6366f1)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
