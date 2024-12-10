export default defineAppConfig({
  ui: {
    primary: 'accent',
    notifications: {
      // Show toasts at the top right of the screen
      position: 'bottom-0 bottom-[unset]'
    },
    button: {
      font: 'font-medium',
      rounded: 'rounded-md',
      variant: {
        solid: 'font-medium bg-accent rounded-md px-4 py-2 flex justify-center items-center hover:bg-accent-200 active:bg-accent-200 transition-all text-base',
        soft: 'font-medium bg-accent-50 text-accent rounded-md px-4 py-2 flex justify-center items-center hover:bg-accent-100 active:bg-accent-100 transition-all text-base',
        ghost: 'hover:bg-accent-200/50 active:bg-accent-200/50 transition-all',
        outline: 'bg-white rounded-md py-2 px-4 ring-gray-300 text-main text-base hover:ring-accent-200 active:ring-accent-200 transition-all'
      },
      default: {
        size: 'sm',
        variant: 'solid',
        color: 'primary',
        loadingIcon: 'i-heroicons-arrow-path-20-solid'
      }
    }
  },
})