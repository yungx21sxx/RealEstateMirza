<script setup lang="ts">

import MenuMain from "~/modules/menu/components/MenuMain.vue";
import ContactsBlock from "~/modules/mainPage/ContactsBlock.vue";
import ReviewsWidget from "~/modules/mainPage/ReviewsWidget.vue";

useSeoMeta({
	title: 'Sky Apartments: Контакты',
	description: 'Контакты Sky Apartments: свяжитесь с нами для аренды квартир в Москве. Позвоните по телефону, напишите в WhatsApp или Telegram, отправьте заявку онлайн. Мы всегда на связи!'
})

</script>

<template>
	<MenuMain/>
	<ContactsBlock/>
	<div class="wrapper py-8 rounded-xl" style="position:relative;overflow:hidden;">
		<iframe title="Яндекс карты" src="https://yandex.com/map-widget/v1/org/sky_apartment_mirza/117668261158/reviews/?ll=37.380588%2C55.713527&utm_content=read-more&utm_medium=reviews&utm_source=maps-reviews-widget&z=17" class="max-[500px]:h-[630px] h-[500px]" frameborder="1" allowfullscreen="true" style="position:relative; width: 100%; border-radius: 12px"></iframe>
	</div>
</template>

<style scoped lang="scss">

</style>