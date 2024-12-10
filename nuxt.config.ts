// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'vue-yandex-maps/nuxt',
    // 'nuxt-delay-hydration',
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
  // delayHydration: {
  //   // enables nuxt-delay-hydration in dev mode for testing
  //   // NOTE: you should disable this once you've finished testing, it will break HMR
  //   debug: process.env.NODE_ENV === 'development',
  //   mode: 'init'
  // },
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

  compatibilityDate: '2024-11-23'
})