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
            dark: '#658215',
            darkest: '#41820E'
          },
          reward: {
            DEFAULT: '#37814B'
          }
        },
        fontFamily: {
          serif: ['Poppins', 'Montserrat','Roboto Slab', 'serif'],
          sans: ['Inter', 'SF UI Text', 'Roboto Condensed', 'sans-serif'],
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
          fade: "fade 0.5s forwards ease",
          blob: "blob 7s infinite",
          cheer: "cheer 1.5s forwards ease",
          fadeInDown: "fadeInDown 0.5s forwards ease",
          fadeInUp: "fadeInUp 0.5s forwards ease",
          grabAttention: "grabAttention 1.35s forwards ease-in-out",
          tiltGradient: "tiltGradient 10s infinite linear"
          

        },
        keyframes: {
          tiltGradient: {
            "0%" : {
              transform: "rotateZ(0deg);"
            },
            "33%" : {
              transform: "rotateZ(1deg);"
            },
            "66%" : {
              transform: "rotateZ(-1deg);"
            },
            "100%" : {
              transform: "rotateZ(0deg);"
            },
          },
          grabAttention: {
            "0%": {
              transform: "rotateZ(0deg)",
              color: "inherit",
            },
            "15%": {
              transform: "rotateZ(0deg)",
              color: "var(--highlight-color,  #e8b50d)"
            },
            "33%": {
              transform: "rotateZ(10deg)",
              color: "var(--highlight-color,  #e8b50d)"
            },
            "66%": {
              transform: "rotateZ(-10deg)",
              color: "var(--highlight-color,  #e8b50d)"
            },
            "85%": {
              transform: "rotateZ(0deg)",
              color: "var(--highlight-color,  #e8b50d)"
            },
            "100%": {
              transform: "rotateZ(0deg)",
              color: "inherit"
            }
          },
          blob: {
            "0%": {
              transform: "translate(0px, 0px) scale(1)"
            },
            "33%": {
              transform: "translate(15px, -30px) scale(1.15)"
            },
            "66%": {
              transform: "translate(-10px, 20px) scale(0.85)"
            },
            "100%": {
              transform: "translate(0px, 0px) scale(1)"
            },
          },
          cheer: {
            "0%": {
              opacity: "0",
              transform: "translate(0px, 200px) scale(0.85) "
            },
            "100%": {
              opacity: "1",
              transform: "translate(0px, 0px) scale(1)"
            },
          },
          fade: {
            "0%": {
              opacity: "0"
            },
            "100%": {
              opacity: "1"
            }
          },
          fadeInDown: {
            "0%": {
              opacity: "0",
              transform: "translateY(-20%)"

            },
            "100%": {
              opacity: "1",
              transform: "translateY(0%)"
            }
          },
          fadeInUp: {
            "0%": {
              opacity: "0",
              transform: "translateY(20%)"

            },
            "100%": {
              opacity: "1",
              transform: "translateY(0%)"


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