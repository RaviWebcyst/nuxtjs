export default {
    serverMiddleware: ['~/serverMiddleware/api'],
  
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'spin_game',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css' },
        { rel: 'stylesheet',  href: '/style/main.css' },
      ]
    },
  
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],
  
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      { src: '~/plugins/jwt.js', mode: 'client' },
      { src: '~/plugins/countdown.js', mode: 'client' },
      { src: '~/plugins/store.js' },
  
    ],
  
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
  
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],
  
    error({ statusCode, message }) {
      if (statusCode === 500) {
        // Handle the 500 error
        console.log(`Error ${statusCode}: ${message}`)
      }
    },
  
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/bootstrap
      'bootstrap-vue/nuxt',
      '@nuxtjs/auth-next',
      '@nuxtjs/toast',
      
    ],
   
  
    components: true,
  
    // axios: {
    //   baseURL: 'http://localhost:3000/api',
    // },
  
    router: {
      middleware: ['auths']
    },
    env: {
      baseUrl: 'http://localhost:4000',
      appUrl:'http://localhost:3000/',
      apiUrl:'http://localhost:8000/'
    },
  
    
    // auth: {
    //   strategies: {
    //     local: {
    //       token: {
    //         property: 'token',
    //         global: true,
    //         // required: true,
    //         // type: 'Bearer'
    //       },
    //       user: {
    //         property: 'user',
    //         // autoFetch: true
    //       },
    //       endpoints: {
    //         login: { url: '/api/auth/login', method: 'post' },
    //         logout: { url: '/api/auth/logout', method: 'post' },
    //         user: { url: '/api/auth/user', method: 'get' }
    //       }
    //     }
    //   }
    // },
  
    auth: {
      strategies: {
        local: {
          endpoints: {
            login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
            logout: { url: '/api/auth/logout', method: 'post' },
            user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
          },
          tokenRequired: true,
          tokenType: 'Bearer'
        }
      }
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      
    },
  
  
   
  
  }
  