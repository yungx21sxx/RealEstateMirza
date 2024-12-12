<script setup lang="ts">

import WorkIcon from "~/modules/mainPage/icons/adv/WorkIcon.vue";
import KeyIcon from "~/modules/mainPage/icons/adv/KeyIcon.vue";
import GraphIcon from "~/modules/mainPage/icons/adv/GraphIcon.vue";
import SupportIcon from "~/modules/mainPage/icons/adv/SupportIcon.vue";

</script>

<template>

	<div class="wrapper text-center pt-14">
		<p class="font-semibold text-accent">Мои Преимущества</p>
		<h2 class="font-bold text-2xl sm:text-3xl mb-8">Почему выбирают меня?</h2>
		
		<div class=advantages>
			<div class="advantage">
				<WorkIcon class="advantage__icon"/>
				<h3 class="advantage__title">Полный цикл работы</h3>
				<p class="advantage__text">От фотосессии до заселения клиентов.</p>
			</div>
			<div class="advantage">
				<KeyIcon class="advantage__icon"/>
				<h3 class="advantage__title">Гарантия безопасности</h3>
				<p class="advantage__text">Проверка арендаторов и страхование.</p>
			</div>
			<div class="advantage">
				<GraphIcon class="advantage__icon"/>
				<h3 class="advantage__title">Высокая прибыльность</h3>
				<p class="advantage__text">Заполняемость квартир до 95%.</p>
			</div>
			<div class="advantage">
				<SupportIcon class="advantage__icon"/>
				<h3 class="advantage__title">Поддержка 24/7</h3>
				<p class="advantage__text">Всегда на связи с клиентами.</p>
			</div>
		</div>
	
	</div>
</template>

<style scoped lang="scss">

.advantages {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(273px, 1fr));
	gap: 16px;
	justify-content: center;
}

.advantage {
	@apply rounded-md border border-gray-200 px-4 py-6 text-center flex flex-col items-center w-full;

	&__title {
		@apply font-semibold text-lg mt-4 mb-2;
	}
	
	&__text {
		@apply text-secondary;
	}
}

</style>