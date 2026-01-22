/** @type {import('tailwindcss').Config} */
module.exports = {
      content: [
                './pages/**/*.{js,ts,jsx,tsx,mdx}',
                './components/**/*.{js,ts,jsx,tsx,mdx}',
                './app/**/*.{js,ts,jsx,tsx,mdx}',
            ],
      theme: {
                extend: {
                              colors: {
                                                'gravity': {
                                                                      50: '#f0f4ff',
                                                                      100: '#e0e9ff',
                                                                      200: '#c7d7ff',
                                                                      300: '#a5bbff',
                                                                      400: '#8095ff',
                                                                      500: '#6366f1',
                                                                      600: '#4f46e5',
                                                                      700: '#4338ca',
                                                                      800: '#3730a3',
                                                                      900: '#312e81',
                                                                      950: '#1e1b4b',
                                                },
                                                'heal': {
                                                                      50: '#fdf4ff',
                                                                      100: '#fae8ff',
                                                                      200: '#f5d0fe',
                                                                      300: '#f0abfc',
                                                                      400: '#e879f9',
                                                                      500: '#d946ef',
                                                                      600: '#c026d3',
                                                                      700: '#a21caf',
                                                                      800: '#86198f',
                                                                      900: '#701a75',
                                                }
                              },
                              fontFamily: {
                                                sans: ['Inter', 'sans-serif'],
                                                display: ['Outfit', 'sans-serif'],
                              },
                              animation: {
                                                'float': 'float 6s ease-in-out infinite',
                                                'fall': 'fall 2s ease-in forwards',
                                                'glow': 'glow 2s ease-in-out infinite',
                              },
                              keyframes: {
                                                float: {
                                                                      '0%, 100%': { transform: 'translateY(0px)' },
                                                                      '50%': { transform: 'translateY(-20px)' },
                                                },
                                                fall: {
                                                                      '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
                                                                      '10%': { opacity: '1' },
                                                                      '100%': { transform: 'translateY(0) rotate(360deg)', opacity: '1' },
                                                },
                                                glow: {
                                                                      '0%, 100%': { opacity: '1' },
                                                                      '50%': { opacity: '0.5' },
                                                },
                              },

                              backdropBlur: {
                                                xs: '2px',
                              }
                },
      },
      plugins: [],
}
