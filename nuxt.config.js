export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SISPRO',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'Marvin Córdoba Zamora' },
      { name: 'keywords', content: 'raccs, gobierno regional, produccion' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'leaflet/dist/leaflet.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/Vuelidate', ssr: false},
    {src: '~/plugins/Permissions'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/moment',
    ['nuxt-leaflet', { ssr: false }]
  ],

  bootstrapVue: {
    icons: true
  },

  env: {
    appName: 'sispro',
    appFullName: 'Sistema de Seguimiento a la Producción',
    officeName: 'Secretaría de Producción, Industria y Comercio',
    appOwner: 'Gobierno Regional del Caribe Sur',
    apiUrl: 'http://si.graccs.gob.ni/api/sispro/',
    basemapUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    basemapAttribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    basemapZoom: 11,
    basemapCenter: [12.01454337239549, -83.76503801461611]  // Bluefields
  },

  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href',
    'b-avatar': 'src',
    'b-img': 'src',
    'b-img-lazy': ['src', 'blank-src'],
    'b-card': 'img-src',
    'b-card-img': 'src',
    'b-card-img-lazy': ['src', 'blank-src'],
    'b-carousel-slide': 'img-src',
    'b-embed': 'src',
  },

  loading: {
    color: 'blue',
    height: '5px'
  },

  loadingIndicator:{
    name: 'cube-grid', // 'circle',
    color: '#1987DB',
    background: '#C2D0F2',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'http://localhost:9000/api/sispro/',
    https: false,
    headers: {
      common: {
        'Accept': 'application/json, text/plain'
      },
      get: {
        'Content-Type': 'application/json'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
