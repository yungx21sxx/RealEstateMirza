<script setup lang="ts">

import TelegramIcon from "~/modules/mainPage/icons/TelegramIcon.vue";
import WhatsUpIcon from "~/modules/mainPage/icons/WhatsUpIcon.vue";
</script>

<template>
	<div class="listing-card flex flex-col justify-center items-center ">
		<UAvatar src="/gay.jpg" size="2xl" img-class="object-cover"/>
		<h3 class="font-semibold text-xl mt-4">Мирза</h3>
		<NuxtLink class="text-lg mt-2" to="tel:/+79816981100">+7 (981) 698-11-00</NuxtLink>
		<div class="flex gap-2 mt-4">
			<UButton variant="soft" class="bg-blue-100 gap-2 text-blue-700 active:bg-blue-50 hover:bg-blue-50">
				<TelegramIcon fill="#7059FF"/>
				<span>Telegram</span>
			</UButton>
			<UButton variant="soft" class="bg-green-100 gap-2 text-green-700 active:bg-green-50 hover:bg-green-50">
				<WhatsUpIcon fill="#2F9E45"/>
				<span>WhatsApp</span>
			</UButton>
		</div>
	</div>
</template>

<style scoped lang="scss">

</style>