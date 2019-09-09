const path = require('path')
module.exports = {
  mode: 'universal',
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'assets/css/page.scss',
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    //{src: '@/plugins/quill-editor.js', ssr: false }
    {src: '@/plugins/quill-editor.js', mode: 'client'},
    // '@/plugins/quill-editor.js'}

  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // if (ctx.isClient) {
      //   console.log('ccc', config)
      //   // 添加 alias 配置
      //   Object.assign(config.resolve.alias, {
      //     'assets': path.resolve(__dirname, 'assets'),
      //     'cpage': path.resolve(__dirname, 'components/page'),
      //     'cbase': path.resolve(__dirname, 'components/base'),
      //   })
      //   console.log('ccc222', config)
      // }
      Object.assign(config.resolve.alias, {
        'assets': path.resolve(__dirname, 'assets'),
        'c': path.resolve(__dirname, 'components'),
        //'cbase': path.resolve(__dirname, 'components/base'),
        'interface': path.resolve(__dirname, 'server/interface'),
      })
    },
    babel: {
      sourceType: "unambiguous",
      presets({ isServer }) {
          return [
            [
              "@nuxt/babel-preset-app",
              {
                targets: isServer
                  ? { node: "current" }
                  : { browsers: ["last 2 versions"], ie: 11 },
                //modules: true,
                //useBuiltIns: "usage"
              }
            ]
          ]
        },

    }
  },

}
