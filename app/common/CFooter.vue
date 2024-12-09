<script setup lang="ts">

import WhatsUpIcon from "~/modules/mainPage/icons/WhatsUpIcon.vue";
import TelegramIcon from "~/modules/mainPage/icons/TelegramIcon.vue";
import PhoneIcon from "~/modules/mainPage/icons/contacts/PhoneIcon.vue";
</script>

<template>
	<footer class="bg-black-background py-12">
		<div class="wrapper grid grid-cols-3 gap-4 justify-between text-white max-md:grid-cols-1 max-md:gap-8">
			<div>
				<h4 class="text-accent font-semibold text-2xl mb-2">Логотип</h4>
				<p class="text-gray-300 mb-5">Сдача квартир посуточно с гарантией надежности и максимальной доходности.</p>
				<div class="text-gray-500 text-sm">2024 © Все права защещены</div>
			</div>
			<div>
				<h4 class="font-semibold text-xl">Карта сайта</h4>
				<div class="links flex flex-wrap gap-4 text-gray-200 mt-4">
					<NuxtLink to="/">Главная</NuxtLink>
					<NuxtLink to="/">Контакты</NuxtLink>
					<NuxtLink to="/">Апартаменты</NuxtLink>
					<NuxtLink to="/">Политика конфиденциальности</NuxtLink>
				</div>
			
			</div>
			<div>
				<h4 class="font-semibold text-xl mb-4">Контакты</h4>
				<div class="contact">
					<UIcon name="i-prime:phone" class="contact__icon"/>
					<div class="contact__info">
						<div class="contact__title">Телефон:</div>
						<NuxtLink to="/" class="contact__data">+7 (928) 851-40-84</NuxtLink>
						<div class="flex gap-4 mt-3 flex-wrap">
							<UButton class="rounded-full py-1">
								<template #leading>
									<WhatsUpIcon fill="white"/>
								</template>
								Whats up
							</UButton>
							<UButton class="rounded-full py-1">
								<template #leading>
									<TelegramIcon fill="white"/>
								</template>
								Telegram
							</UButton>
						</div>
					</div>
				</div>
				<div class="contact">
					<UIcon name="i-prime:map-marker" class="contact__icon"/>
					<div class="contact__info">
						<div class="contact__title">Адрес:</div>
						<NuxtLink class="contact__data">г. Гудаута, Очамчирская 89</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
	.links > * {
		@apply hover:text-gray-50 active:text-gray-50;
	}
	.contact {
		@apply flex gap-4 align-top mb-4;
		
		&__title {
			@apply text-xs text-gray-400 mb-1;
		}
		
		&__icon {
			@apply h-5 w-5;
		}
	}

</style>