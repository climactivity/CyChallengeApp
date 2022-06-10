module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        colors: {
          storm: {
            lightest: '#F0F0ED',
            light: '#B0B0AE',
            DEFAULT: '#636362',
            dark: '#4A4A49',
            darkest: '#424242'
          },
          heart: {
            light: '#ED90A6',
            DEFAULT: '#e40045',
            dark: '#A30031'
          },
          water2: {
            light: '#8BB9C3',
            DEFAULT: '#5689a0',
            dark: '#466F82'
          },
          water: {
            light: '#164e63',
            DEFAULT: '#0c4a5e',
          },
          nature: {
            light: '#A0CF21',
            DEFAULT: '#95c11e',
            dark: '#658215'
          }
        },
        fontFamily: {
          serif: ['Poppins', 'Montserrat','Roboto Slab', 'serif'],
          'sans-serif': ['Inter', 'SF UI Text', 'Roboto Condensed', 'sans-serif'],
          cursive: ['Loved by the King', 'cursive']
        },
        typography: {
          DEFAULT: {
            css: {
              a: {
                color: '#95c11e',
                '&:hover': {
                  color: '#A0CF21'
                }
              },
              h1: {
                color: '#5689a0'
              },
              h2: {
                color: '#5689a0'
              },
              h3: {
                color: '#5689a0'
              },
              p: {
                b: {
                  color: '#5689a0'
                }
              }
            }
          }
        },
        animation: {
          fade: "fade 0.5s forwards ease"
        },
        keyframes: {
          fade: {
            "0%": {
              opacity: "0"
            },
            "100%": {
              opacity: "1"
            }
          }
        }
      },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};