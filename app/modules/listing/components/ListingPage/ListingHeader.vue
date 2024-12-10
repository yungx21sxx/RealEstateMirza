<script setup lang="ts">
	import useListing from "~/modules/listing/composables/useListing";
	import useBooking from "~/modules/listing/composables/useBooking";
	import useAuthUser from "~/modules/auth/composables/useAuthUser";
	
	const authUser = useAuthUser();
	
	const isAdmin = computed(() => authUser.value && authUser.value.role === 'ADMIN')
	
	const {listing} = useListing();
	const {calculatedPrices} = useBooking()
	const breadCrumbs = [
		{
			label: 'Главная',
			to: '/'
		},
		{
			label: 'Каталог',
			to: '/catalog'
		}
	]
	
	const priceStr = computed(() => {
		if (calculatedPrices.value) {
			console.log(calculatedPrices.value)
			return `${calculatedPrices.value.dailyPrice.toLocaleString('ru-RU')} ₽ за сутки`
		}
		return `от ${listing.value.minPrice.toLocaleString('ru-RU')} ₽ за сутки`
	})
	
	const toast = useToast()
	
	const toastActions = [
		{
			label: 'Удалить',
			click: async () => {
				await $fetch(`/api/admin/listing/${listing.value.id}`, {
					method: 'DELETE'
				})
				alert('Объект удален')
				await navigateTo('/catalog')
			}
		},
		{
			label: 'Отмена',
			click: () => {
				toast.clear()
			}
		}
	]
</script>

<template>
	<div class="listing-card">
		<UBreadcrumb :links="breadCrumbs"/>
		<div class="max-[640px]:flex-col gap-3 flex justify-between mt-3">
			<h1 class="font-semibold text-2xl">{{listing.title}}</h1>
			<div class="font-medium text-xl text-secondary">{{priceStr}}</div>
		</div>
		<div class="flex gap-4 flex-wrap mt-3">
			<div class="flex gap-2 items-center">
				<UIcon name="i-material-symbols:location-on-outline" class="text-secondary"/>
				<span class="text-secondary">{{listing.address}}</span>
			</div>
			<UButton variant="link" icon="material-symbols:map-outline">На карте</UButton>
		</div>
		
		<div v-if="isAdmin" class="flex gap-4 mt-4 max-md:flex-col">
			<UButton to="/admin/create-listing" class="bg-blue-400">Создать объект</UButton>
			<UButton :to="`/admin/update/${listing.id}`" class="bg-orange-400">Редактировать объект</UButton>
			<UButton @click="toast.add({ title: 'Точно удалять?', actions: toastActions })" class="bg-red-500">Удалить объект</UButton>
		</div>
	</div>
	
</template>

<style scoped lang="scss">

</style>