<template>
  <div id="app">
    <Particles id="tsparticles"
               :options="options"></Particles>
    <router-view v-animate-css="'fadeIn'"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      options: {
        background: {
          color: '#eee'
        },
        fpsLimit: 30,
        particles: {
          number: {
            value: 20,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ['#2EB67D', '#ECB22E', '#E01E5B', '#36C5F0']
          },
          shape: {
            type: ['circle'],
            stroke: {
              width: 0,
              color: '#fff'
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: 'https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png',
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 1,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: false,
              speed: 10,
              size_min: 5,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#808080',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 5,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      }
    }
  }
}
</script>
<style lang="scss">
html {
  width: 100%;
  height: 100%;
  letter-spacing: 1px;
  font-family: 'Microsoft YaHei';
}
body {
  width: 100%;
  height: 100%;
}
/* 隐藏滚动条 */
body::-webkit-scrollbar {
  width: 0px;
}
html,
body {
  cursor: url('./assets/指针.png'), auto;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
