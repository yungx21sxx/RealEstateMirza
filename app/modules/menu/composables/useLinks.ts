import type {IMenuLink} from "~/modules/menu/types/menu.types";
import type {ComputedRef} from "vue";

export default (): ComputedRef<IMenuLink[]> => {
    const links: Omit<IMenuLink, 'isActive'>[] =  [
        {
            label: 'Главная',
            to: '/',
            icon: 'i-mdi-light:home', // Иконка должна находиться в папке components/icons/menu
        },
        {
            label: 'Контакты',
            to: '/contacts',
            icon: 'i-system-uicons:contacts',
        },
        {
            label: 'Апартаменты',
            to: '/catalog',
            icon: 'i-solar:key-linear',
        },
    ];

    const route = useRoute();
    const isActive = (href: string): boolean => route.path === href;

    return computed(() => links.map(link => ({
        ...link,
        isActive: isActive(link.to)
    })))
}