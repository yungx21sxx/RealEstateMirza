<script setup lang="ts">

import PhoneIcon from "~/modules/mainPage/icons/contacts/PhoneIcon.vue";
import WhatsUpIcon from "~/modules/mainPage/icons/WhatsUpIcon.vue";
import TelegramIcon from "~/modules/mainPage/icons/TelegramIcon.vue";
import AddressIcon from "~/modules/mainPage/icons/contacts/AddressIcon.vue";
import MailIcon from "~/modules/mainPage/icons/contacts/MailIcon.vue";
import CallSubmitForm from "~/common/forms/CallSubmitForm.vue";
</script>

<template>
	<div class="bg-block-gray py-10">
		<div class="wrapper grid md:grid-cols-2 gap-10">
			<div>
				<h2 class="font-bold text-2xl md:text-3xl mb-2">Мои контакты</h2>
				<p class="text-secondary mb-6">Вы можете написать свой вопрос заранее на сайте или озвучить его по телефону</p>
				<div class="contact">
					<PhoneIcon class="contact__icon"/>
					<div class="contact__info">
						<div class="contact__title">Телефон</div>
						<div class="contact__data">+7 (928) 851-40-84</div>
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
					<AddressIcon class="contact__icon"/>
					<div class="contact__info">
						<div class="contact__title">Адрес</div>
						<div class="contact__data">99 S.t Jomblo Park Pekanbaru
							28292. Indonesia</div>
					</div>
				</div>
				<div class="contact">
					<MailIcon class="contact__icon"/>
					<div class="contact__info">
						<div class="contact__title">Почта</div>
						<div class="contact__data">info@yourdomain.com</div>
					</div>
				</div>
			</div>
			<div class="bg-white rounded-md py-4 px-8 max-md:px-4">
				<h4 class="font-semibold mb-4 text-xl">Оставить заявку</h4>
				<CallSubmitForm/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">

	.contact {
		@apply flex gap-6 align-top mb-8;
		
		&__title {
			@apply text-lg font-semibold mb-2;
		}
		
		&__icon {
			@apply h-16 w-16 shrink-0 max-md:h-12 max-md:w-12;
		}
		
		&__text {
			@apply text-secondary mb-4;
		}
	}

</style>