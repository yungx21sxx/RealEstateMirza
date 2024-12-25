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
	<header class="hero relative bg-gradient-to-b from-black/60 to-black/30">
		<MenuMain variant="light" class="absolute z-10"/>
		<div class="z-10 wrapper">
			<div class="text-white py-44 max-w-2xl">
				<h1 class="font-semibold text-5xl max-md:text-4xl mb-4 leading-[55px] max-md:leading-[45px] max-[364px]:text-3xl  max-[364px]:leading-[40px]">Управление жилой <br> недвижимостью в Москве</h1>
				<div class="mt-2 p-4 bg-gradient-to-r from-accent/50 backdrop-blur-xl to-accent/0 max-w-xl rounded-md">
					<p class="text-xl max-md:text-lg  text-gray-100">Сдача квартир посуточно с гарантией надежности и максимальной доходности.</p>
				</div>
<!--				<p class="text-lg mt-2 text-gray-100">Сдача квартир посуточно с гарантией надежности и максимальной доходности.</p>-->
				<div class="flex gap-4 mt-10 max-md:mt-8">
					<UButton @click="openCallSubmitModal">Оставить заявку</UButton>
					<UButton variant="soft" class="max-[373px]:hidden" to="/catalog">Подобрать жилье</UButton>
				</div>
			</div>
		</div>
		<NuxtImg fit="cover" alt="Сдача квартир посуточно с гарантией надежности и максимальной доходности" class="object-cover absolute -z-10 w-full h-full top-0 left-0 right-0 bottom-0" src="/hero.jpeg" format="webp" quality="100"/>
	</header>
</template>

<style scoped lang="scss">


</style>