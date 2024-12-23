<script setup lang="ts">

import TimeIcon from "~/modules/mainPage/icons/about/TimeIcon.vue";
import ReviewIcon from "~/modules/mainPage/icons/about/ReviewIcon.vue";
import TelegramIcon from "~/modules/mainPage/icons/TelegramIcon.vue";
import WhatsUpIcon from "~/modules/mainPage/icons/WhatsUpIcon.vue";

const img = useImage();

const backgroundImage = computed(() => {
	const imgUrl = img('/gay.jpg', { format: 'webp' })
	return {
		backgroundImage: `url('${imgUrl}')`,
	}
})

</script>

<template>
	<section class="wrapper pt-10 flex justify-between gap-8 max-md:flex-col-reverse max-md:text-center max-md:items-center" itemscope itemtype="https://schema.org/Person">
		<div class="lg:max-w-[750px]">
			<h2 itemprop="jobTitle" class="font-bold text-xl md:text-2xl mb-4">Ваш надежный партнер по сдаче квартир по суточно</h2>
			<p itemprop="description">Я занимаюсь сдачей квартир посуточно уже более 5 лет, помогая собственникам получать стабильный доход, а арендаторам — находить удобное жилье. Мой опыт и внимание к деталям обеспечивают высокую заполняемость и безопасное сотрудничество.</p>
			<ul class="flex items-center gap-10 mt-6 max-md:justify-center text-left max-[430px]:flex-col max-[430px]:gap-6">
				<li class="flex items-center gap-3">
					<TimeIcon class="shrink-0 max-sm:h-6 max-sm:w-6"/>
					<div class="font-medium"><strong class="mr-1">5 лет</strong> опыта в аренде</div>
				</li>
				<li class="flex items-center gap-3">
					<ReviewIcon class="shrink-0 max-sm:h-6 max-sm:w-6"/>
					<div class="font-medium"><strong class="mr-1">~10 000</strong>  довольных клиентов</div>
				</li>
			</ul>
			<div class="mt-8 border-gray-200 border h-[125px] max-[430px]:h-[535px]" style="max-width: 500px; border-radius: 7px; overflow:hidden;position:relative;">
				<iframe loading="lazy" title="Отзывы на Яндекс Картах" style="width:100%;height:100%;box-sizing:border-box; background: #fafafa;" src="https://yandex.ru/maps-reviews-widget/117668261158?comments">
				</iframe>
			</div>
		</div>
		<div :style="backgroundImage" class="bg-cover bg-center bg-no-repeat h-[330px] w-[100%] max-w-[270px] rounded-md flex flex-col p-4 justify-end shrink-0">
			<div class="bg-white/80 rounded-md p-4 flex flex-col justify-center items-center text-center gap-1">
				<h3 itemprop="name" class="font-semibold">Мирза Шихабудинов</h3>
				<p class="text-secondary text-sm">Риелтор</p>
				<div class="flex gap-4 mt-2">
					<NuxtLink
						to="https://wa.me/79816981100"
						title="Написать в WhatsApp"
						aria-label="Написать в WhatsApp"
					>
						<WhatsUpIcon class="h-5 w-5" />
					</NuxtLink>
					
					<NuxtLink
						to="https://t.me/Mir_durov"
						title="Написать в Telegram"
						aria-label="Написать в Telegram">
						<TelegramIcon class="h-5 w-5" />
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
	
</template>

<style scoped lang="scss">

</style>