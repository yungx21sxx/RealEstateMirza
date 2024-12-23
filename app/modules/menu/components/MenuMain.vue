<template>
    <nav :class="['w-full', variant === 'dark' ? 'nav_dark' : 'nav_light']">
        <div class="wrapper py-2 flex items-center">
	        <NuxtLink
		        to="/"
		        external
		        title="Главная страница"
		        aria-label="Главная страница"
		        class="block md:pr-6 md:border-r border-text-primary"
	        >
		        <MainLogo :variant="variant" />
	        </NuxtLink>
<!--	        <UHorizontalNavigation :links="links"/>-->
            <div class="ml-6 hidden md:flex items-center">
	            <NuxtLink
		            v-for="link of links"
		            :to="link.to"
		            :key="link.to"
		            :class="['mr-6 flex items-center gap-2 hover:dark:bg-gray-100', {
			            '!text-accent': link.isActive,
			            'hover:text-secondary': !link.isActive
	                }]"
		            :aria-label="link.label"
		            :title="link.label"
		            :aria-current="link.isActive ? 'page' : undefined"
	            >
		            <UIcon class="h-4 w-4" :name="link.icon"/>
		            <span>{{ link.label }}</span>
	            </NuxtLink>
            </div>
	        <div class="hidden md:flex items-center gap-4 ml-auto">
		        <UButton to="/admin/create-listing" v-if="authUser && authUser.role === 'ADMIN'">Создать объект</UButton>
		        <NuxtLink
			        :class="['rounded-full h-10 px-4 flex items-center active transition-all', variant === 'light' ? 'bg-white/10 hover:bg-white/20 ' : 'bg-gray-100 hover:bg-gray-200']"
			        to="tel:/+79816981100"
			        title="Позвонить"
			        aria-label="Позвонить"
			        v-else
		        >
			        <UIcon name="i-prime:phone" class="h-6 w-6"/>
			        <span class="ml-2">
				         +7 (981) 698-11-00
			        </span>
		        </NuxtLink>
		        
		        <NuxtLink
			        to="https://wa.me/79816981100"
			        class="bg-accent rounded-full h-10 w-10 p-0 flex justify-center items-center hover:bg-accent-200 transition-all"
			        aria-label="Написать в WhatsApp"
			        title="Написать в WhatsApp"
		        >
			        <WhatsIcon class="h-5 w-5"/>
		        </NuxtLink>
		        
		        <NuxtLink
			        to="https://t.me/Mir_durov"
			        class="bg-accent rounded-full h-10 w-10 p-0 flex justify-center items-center hover:bg-accent-200 transition-all"
			        aria-label="Написать в Telegram"
			        title="Написать в Telegram"
		        >
			        <TelegramIcon class="h-5 w-5"/>
		        </NuxtLink>
	        </div>
	        <button
		        class="block md:hidden p-0 ml-auto"
		        @click="open()"
		        aria-label="Открыть меню"
		        title="Открыть меню"
	        >
	            <BurgerIcon :variant="variant" class="h-6 w-6"/>
	        </button>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

	.nav_dark {
		@apply shadow-card;
		background: white;
	}
	
	.nav_light {
		a {
			color: #fff;
		}
	}

</style>

<script setup lang="ts">


import useBurgerMenu from "~/modules/menu/composables/useBurgerMenu";
import type {MenuVariants} from "~/modules/menu/types/menu.types";
import MainLogo from "~/modules/menu/icons/MainLogo.vue";
import useLinks from "~/modules/menu/composables/useLinks";
import WhatsIcon from "~/modules/menu/icons/WhatsIcon.vue";
import TelegramIcon from "~/modules/menu/icons/TelegramIcon.vue";
import BurgerIcon from "~/modules/menu/icons/BurgerIcon.vue";
import useAuthUser from "~/modules/auth/composables/useAuthUser";

const { open } = useBurgerMenu();

const props = withDefaults(
    defineProps<{
        variant?: MenuVariants;
    }>(),
    {
        variant: "dark",
    },
);

const authUser = useAuthUser()

const links = useLinks();

</script>
