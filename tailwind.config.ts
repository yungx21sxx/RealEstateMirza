import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    future: {
        hoverOnlyWhenSupported: true,
    },
    content: [
        './app/**/*.{html,js,ts,jsx,tsx,vue}',
        './app/modules/**/*.{html,js,ts,jsx,tsx,vue}',
        './app/common/**/*.{html,js,ts,jsx,tsx,vue}',
        './app/layouts/*.{html,js,ts,jsx,tsx,vue}',
    ],
    theme: {
        extend: {
            boxShadow: {
                card: '0 3px 15px rgba(0,0,0, 0.05)',
                'card-active': '0 3px 15px rgba(0,0,0, 0.15)',
            },
            textColor: {
                DEFAULT: '#333D46',
            },
            colors: {
               accent: {
                   '50': '#FFF5F2',
                   '100': '#ffe2d4',
                   '200': '#ffc1a9',
                   '300': '#ff8a63',
                   '400': '#fe5f39',
                   '500': '#fc3513',
                   '600': '#ed1c09',
                   '700': '#c50f09',
                   '800': '#9c1012',
                   '900': '#7e1011',
                   '950': '#440608',
                   DEFAULT: '#ff8a63'
               },
                'block-gray': '#F1F3F9',
               'light-gray': '#FAFAFC',
                'black-background': '#292C32',
                white: '#FFFFFF',
                main: '#333D46',
                secondary: '#626262'
            }
        }
    }
}