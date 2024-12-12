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
  ],
  routeRules: {
    '/': {prerender: true}
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
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    // NOTE: you should disable this once you've finished testing, it will break HMR
    debug: process.env.NODE_ENV === 'development',
    mode: 'init'
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
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'format-detection', content: 'telephone=no'},
        {
          name: 'description',
          content: 'Я занимаюсь сдачей квартир посуточно уже более 5 лет, помогая собственникам получать стабильный доход, а арендаторам — находить удобное жилье. Мой опыт и внимание к деталям обеспечивают высокую заполняемость и безопасное сотрудничество.'
        },

      ],
      title: 'Сдать квартиру посуточно в Москве с гарантией надежности и максимальной доходности.'
    },
  },

  compatibilityDate: '2024-11-23'
})