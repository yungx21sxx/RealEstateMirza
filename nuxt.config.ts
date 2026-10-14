// https://nuxt.com/docs/api/configuration/nuxt-config
const config = {
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'vue-yandex-maps/nuxt',
    '@nuxtjs/seo',
    '@nuxt/eslint'
  ],
  css: ['~/common/css/main.css'],
  routeRules: {
    '/': { sitemap: { priority: 1, changefreq: 'monthly', lastmod: new Date().toISOString() } },
    '/catalog': { sitemap: { priority: 0.8, changefreq: 'weekly' } },
    '/contacts': { sitemap: { priority: 0.6, changefreq: 'yearly' } },
    '/obrabotka_personalnyh_dannyh': { sitemap: { priority: 0.1, changefreq: 'never' } },
    '/api/**': { cors: true },
    '/admin/**': { sitemap: false, robots: false }
  },
  sitemap: {
    xsl: false,
    sources: ['/api/__sitemap__/urls']
  },
  nitro: {
    minify: true,
    serveStatic: true,
    compressPublicAssets: {
      brotli: true,
      gzip: true
    }
  },
  googleFonts: {
    families: {
      Inter: true
    }
  },
  yandexMaps: {
    apikey: '3f9c10df-563a-4f31-9dc7-32dab70c1e14'
  },
  colorMode: {
    preference: 'light', // устанавливает предпочтение на светлую тему
    fallback: 'light', // устанавливает светлую тему как fallback
    dataValue: 'light', // атрибут data-* будет всегда 'light'
    storageKey: 'nuxt-color-mode'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('v-calendar') || id.includes('@popperjs/core'))
                return 'calendar'
              if (id.includes('swiper'))
                return 'swiper'
            }
          }
        }
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
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#ffffff', href: '/safari-pinned-tab.svg' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
        { charset: 'utf-16' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },
  compatibilityDate: '2024-11-23'
}

export default defineNuxtConfig(config as any)
