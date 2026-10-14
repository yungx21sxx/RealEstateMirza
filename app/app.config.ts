export default defineAppConfig({
  ui: {
    primary: 'primary',
    button: {
      slots: {
          base: 'cursor-pointer justify-center h-10 rounded-xl px-3 text-sm font-medium gap-1.5 transition-all duration-200 active:scale-[0.99]',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
      },
      variants: {
        variant: {
          solid: '',
          soft: '',
          subtle: '',
          outline: '',
          ghost: '',
          link: '',
          elevated: 'shadow-card hover:shadow-card-active'
        },
        block: {
          true: 'w-full'
        },
        size: {
          sm: 'h-10 px-4 text-sm',
          md: 'h-11 px-5',
          lg: 'h-12 px-6 text-base'
        },
        color: {
          primary: '',
          neutral: ''
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class:
            'text-white bg-primary hover:bg-primary-200 active:bg-primary-200 disabled:bg-primary aria-disabled:bg-primary focus-visible:ring-2 ring-offset-2 ring-offset-white focus-visible:ring-primary'
        },
        {
          color: 'primary',
          variant: 'outline',
          class:
            'ring ring-inset ring-primary/50 text-primary bg-white hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        },
        {
          color: 'primary',
          variant: 'soft',
          class:
            'text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15'
        },
        {
          color: 'primary',
          variant: 'subtle',
          class:
            'text-primary ring ring-inset ring-primary/25 bg-white hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        },
        {
          color: 'primary',
          variant: 'ghost',
          class:
            'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:bg-primary/10'
        },
        {
          color: 'primary',
          variant: 'link',
          class:
            'text-primary hover:text-primary/75 active:text-primary/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary'
        },
        {
          color: 'neutral',
          variant: 'solid',
          class:
            'text-white bg-main hover:bg-main/80 active:bg-main/80 focus-visible:ring-2 focus-visible:ring-main ring-offset-2 ring-offset-white'
        },
        {
          color: 'neutral',
          variant: 'outline',
          class:
            'ring ring-inset ring-main/30 text-main bg-white hover:bg-light-gray active:bg-light-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-main'
        }
      ],
      defaultVariants: {
        size: 'md',
        variant: 'solid',
        color: 'primary'
      }
    }
  }
})
