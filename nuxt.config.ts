// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'vue-yandex-maps/nuxt',
    'nuxt-delay-hydration',
    '@nuxtjs/seo'
  ],
  routeRules: {
    '/': {prerender: true, sitemap: {priority: 1, changefreq: 'monthly', lastmod: new Date().toISOString(),}},
    '/catalog': {sitemap: {priority: 0.8, changefreq: 'weekly'}},
    '/contacts': {sitemap: {priority: 0.6, changefreq: 'yearly'}},
    '/obrabotka_personalnyh_dannyh': {sitemap: {priority: 0.1, changefreq: 'never'}},
    '/api/**': { cors: true },
    '/admin/**': {sitemap: false, robots: false}
  },
  sitemap: {
    xsl: false,
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  nitro: {
    compressPublicAssets: {
      brotli: true, gzip: true
    },
  },
  googleFonts: {
    families: {
      Rubik: true,
    }
  },
  yandexMaps: {
    apikey: '3f9c10df-563a-4f31-9dc7-32dab70c1e14',
  },
  colorMode: {
    preference: 'light'
  },
  future: {
    compatibilityVersion: 4,
  },
  dir: {
    app: 'app'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      }
    }
  },
  sourcemap: {
    server: process.env.NODE_ENV === 'development',
    client: process.env.NODE_ENV === 'development'
  },
  site: {
    url: 'https://sky-apartaments.ru/'
  },
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    // NOTE: you should disable this once you've finished testing, it will break HMR
    debug: process.env.NODE_ENV === 'development',
    mode: 'mount'
  },
  // vitalizer: {
  //   // Remove the render-blocking entry CSS
  //   disableStylesheets: 'entry',
  //   disablePrefetchLinks: true
  // },
  experimental: {
    scanPageMeta: 'after-resolve',
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },
  // webpack: {
  //   optimization: {
  //     minimize: true,
  //     // Other optimization options
  //   }
  // },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      link: [
        {rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png'},
        {rel: 'icon', sizes: "32x32", type: 'image/png', href: '/favicon-32x32.png'},
        {rel: 'icon', sizes: "16x16", type: 'image/png', href: '/favicon-16x16.png'},
        {rel: 'icon',  type: 'image/x-icon', href: '/favicon.ico'},
        {rel: 'manifest', href: '/site.webmanifest'},
        {rel: 'mask-icon', color: "#ffffff", href: '/safari-pinned-tab.svg'},

      ],
      meta: [
        {name: "msapplication-TileColor", content: "#ffffff"},
        {name: "theme-color", content: "#ffffff"},
        {charset: 'utf-16'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
        {name: 'format-detection', content: 'telephone=no'},

      ],
    },
  },

  compatibilityDate: '2024-11-23'
})