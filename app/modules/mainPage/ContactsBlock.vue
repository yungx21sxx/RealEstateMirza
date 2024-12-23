<script setup lang="ts">

import PhoneIcon from "~/modules/mainPage/icons/contacts/PhoneIcon.vue";
import WhatsUpIcon from "~/modules/mainPage/icons/WhatsUpIcon.vue";
import TelegramIcon from "~/modules/mainPage/icons/TelegramIcon.vue";
import AddressIcon from "~/modules/mainPage/icons/contacts/AddressIcon.vue";
import MailIcon from "~/modules/mainPage/icons/contacts/MailIcon.vue";
import CallSubmitForm from "~/common/forms/CallSubmitForm.vue";
</script>

<template>
	<section class="bg-block-gray py-10" itemscope itemtype="http://schema.org/Organization">
		<div class="wrapper grid md:grid-cols-2 gap-10">
			<div>
				<h2 class="font-bold text-2xl md:text-3xl mb-2">Мои контакты</h2>
				<p class="text-secondary mb-6">Вы можете написать свой вопрос заранее на сайте или озвучить его по телефону</p>
				<div class="contact" itemprop="contactPoint" itemscope itemtype="http://schema.org/ContactPoint">
					<PhoneIcon class="contact__icon"/>
					<div class="contact__info">
						<h3 class="contact__title">Телефон</h3>
						<NuxtLink itemprop="telephone" aria-label="Позвонить по телефону +7 (981) 698-11-00" to="tel:/+79816981100" class="contact__data">+7 (981) 698-11-00</NuxtLink>
						<NuxtLink  aria-label="Позвонить по телефону +7 (993) 916-34-54" itemprop="telephone" to="tel:/+79939163454" class="contact__data">+7 (993) 916-34-54</NuxtLink>
						<div class="flex gap-4 mt-3 flex-wrap">
							<UButton
								class="rounded-full py-1"
								to="https://wa.me/79816981100"
								title="Написать в WhatsApp"
								aria-label="Написать в WhatsApp"
								itemprop="sameAs"
								content="https://wa.me/79816981100"
							>
								<template #leading>
									<WhatsUpIcon fill="white"/>
								</template>
								Whats up
							</UButton>
							<UButton
								class="rounded-full py-1"
								to="https://t.me/Mir_durov"
								title="Написать в Telegram"
								aria-label="Написать в Telegram"
								itemprop="sameAs" content="https://t.me/Mir_durov"
							>
								<template #leading>
									<TelegramIcon fill="white"/>
								</template>
								Telegram
							</UButton>
						</div>
					</div>
				</div>
				<div class="contact" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<AddressIcon class="contact__icon"/>
					<div class="contact__info">
						<h3 class="contact__title" itemprop="streetAddress">Адрес</h3>
						<div class="contact__data">Овражная улица, 47А, Новоивановское, Московская Область</div>
					</div>
				</div>
				<div class="contact">
					<MailIcon class="contact__icon"/>
					<div class="contact__info">
						<h3 class="contact__title">Почта</h3>
						<NuxtLink aria-label="Отправить письмо на sheikhov.amin@mail.ru" itemprop="email" to="mailto:sheikhov.amin@mail.ru" class="contact__data">sheikhov.amin@mail.ru</NuxtLink>
					</div>
				</div>
			</div>
			<div class="bg-white rounded-md py-4 px-8 max-md:px-4 h-fit">
				<h4 class="font-semibold mb-4 text-xl">Оставить заявку</h4>
				<CallSubmitForm/>
			</div>
		</div>
	</section>
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
		
		&__data {
			@apply block mb-4;
		}
	}

</style>