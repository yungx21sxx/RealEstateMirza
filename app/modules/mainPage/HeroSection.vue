<script setup lang="ts">
import MenuMain from "~/modules/menu/components/MenuMain.vue";
import useModals from "~/common/composables/useModals";
const img = useImage();

const srcset = computed(() => {
	const {srcset} = img.getSizes('/hero.png', {
		sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
		modifiers: {
			format: 'webp',
			quality: 90,
		},
	})
	return srcset;
})

const {openCallSubmitModal} = useModals()

</script>

<template>
	<header class="hero relative">
		<MenuMain variant="light" class="absolute z-10"/>
		<div class="wrapper z-10 bg-gradient-to-b from-black/30 via-black/0 to-transparent">
			<div class=" text-white py-44 max-w-xl">
				<h1 class="font-semibold text-4xl max-md:text-3xl">Управление жилой <br> недвижимостью в Москве</h1>
				<p class="text-lg mt-2 text-gray-100">Сдача квартир посуточно с гарантией надежности и максимальной доходности.</p>
				<div class="flex gap-4 mt-8">
					<UButton @click="openCallSubmitModal">Оставить заявку</UButton>
					<UButton variant="soft" class="max-[373px]:hidden" to="/catalog">Подобрать жилье</UButton>
				</div>
			</div>
		</div>
		<NuxtImg fit="cover" class="object-cover absolute -z-10 w-full h-full top-0 left-0 right-0 bottom-0" src="/hero.png" format="webp" quality="100" :srcset="srcset"/>
	</header>
</template>

<style scoped lang="scss">


</style>