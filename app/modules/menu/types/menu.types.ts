export type MenuVariants = 'dark' | 'light';

export interface IMenuLink {
    label: string;
    to: string;
    isActive: boolean;
    icon: string;
}