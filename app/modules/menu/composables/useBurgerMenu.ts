export default () => {
    const burgerMenuIsOpen = useState<boolean>(() => false);
    const open = () => {
        burgerMenuIsOpen.value = true;
        console.log('open')
    }
    const close = () => burgerMenuIsOpen.value = false;

    return {
        burgerMenuIsOpen,
        close,
        open
    };
  }