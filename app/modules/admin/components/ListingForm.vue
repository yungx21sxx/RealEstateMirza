<script setup lang="ts">
	import type {ListingCreateDTO} from "#shared/types/dto.types";
	import { z } from 'zod'
	import type { FormSubmitEvent } from '#ui/types'
	import useListingFormData from "~/modules/admin/state/useListingFormData";
	import PeriodsCreater from "~/modules/admin/components/PeriodsCreater.vue";
	import {
		amenitiesProperties,
		appliancesProperties,
		balconyProperties,
		internetAndTVProperties, parkingProperties
	} from "~/modules/admin/constants/properties";
	import FileUploader from "~/modules/admin/components/FileUploader.vue";
	import SetLocation from "~/modules/admin/components/SetLocation.vue";
	import useCreateListing from "~/modules/admin/composables/useCreateListing";
	import {transformFormToDTO} from "~/modules/admin/composables/useTransformToDTO";
	import type {H3Error} from "h3";
	import useUpdateListing from "~/modules/admin/composables/useUpdateListing";
	
	const {updateMode = false} = defineProps<{
		updateMode: boolean
	}>();
	
	const listingFormValidationSchema = z.object({
		title: z.string({ message: "Поле 'Название' обязательно для заполнения." }),
		description: z.string({ message: "Поле 'Описание' обязательно для заполнения." }),
		minPrice: z.number({ message: "Поле 'Минимальная цена' должно быть больше 0." }),
		
		roomCount: z.number({ message: "Поле 'Количество комнат' обязательно для заполнения." }),
		bedDescription: z.string({ message: "Поле 'Описание спальных мест' обязательно для заполнения." }),
		area: z.number({ message: "Поле 'Площадь' обязательно для заполнения." }),
		floor: z.number({ message: "Поле 'Этаж' обязательно для заполнения." }),
		maxFloor: z.number({ message: "Поле 'Этажность дома' обязательно для заполнения." }),
		balcony: z.string({ message: "Поле 'Балкон' обязательно для заполнения." }),
		viewDescription: z.string({ message: "Поле 'Описание вида' обязательно для заполнения." }),
		
		appliances: z.array(z.string()).refine((arr) => arr.length > 0, { message: "Выберите хотя бы одну опцию в поле 'Бытовая техника'." }),
		internetAndTV: z.array(z.string()).refine((arr) => arr.length > 0, { message: "Выберите хотя бы одну опцию в поле 'Интернет и ТВ'." }),
		amenities: z.array(z.string()).refine((arr) => arr.length > 0, { message: "Выберите хотя бы одну опцию в поле 'Удобства'." }),
		
		places: z.number({ message: "Поле 'Количество мест' обязательно для заполнения." }),
		parkingDescription: z.string({ message: "Поле 'Описание парковки' обязательно для заполнения." }),
	});
	
	type Schema = z.output<typeof listingFormValidationSchema>
	
	const {listingFormData} = useListingFormData();
	
	const loading = ref(false);
	const route = useRoute();
	
	const {fetchUpdateData, updateListing} = useUpdateListing();
	
	if (updateMode) {
		try {
			listingFormData.value = await fetchUpdateData(parseInt(route.params.id as string))
		} catch (e) {
			alert('Возможно объект был удален')
		}
	}
	
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		loading.value = true;
		const {submitListingData} = useCreateListing();
		
		const dto: ListingCreateDTO = transformFormToDTO(listingFormData.value);
		try {
			if (updateMode && route.params.id) {
				const {listingId} = await updateListing(parseInt(route.params.id as string), dto);
				await navigateTo({
					path: `/listing/${listingId}`,
				}, {
					external: true
				})
				return;
			} else {
				const {listingId} = await submitListingData(dto);
				await navigateTo({
					path: `/listing/${listingId}`,
				}, {
					external: true
				})
				return;
			}
		} catch (e: H3Error | any) {
			console.log(e);
		} finally {
			loading.value = false;
		}
	}
	

	

</script>

<template>
	<UForm :schema="listingFormValidationSchema" :state="listingFormData" ref="form" class="space-y-4" @submit="onSubmit">
		<UCard class="-mx-4">
			<template #header>
				<h2 class="font-semibold text-xl" v-if="!updateMode">Создание объекта</h2>
				<h2 class="font-semibold text-xl" v-else>Редактирование объекта</h2>
			</template>
			<div class="space-y-4">
				<UFormGroup label="Название" name="title">
					<UInput v-model="listingFormData.title" />
				</UFormGroup>
				<UFormGroup label="Описание"  name="description">
					<UTextarea autoresize v-model="listingFormData.description" />
				</UFormGroup>
			</div>
		</UCard>
		
		<UCard class="-mx-4">
			<template #header>
				<h2 class="font-semibold text-xl mb-2">Цены</h2>
				<p>Укажите минимальную цену, после чего добавьте периоды цен.</p>
			</template>
			<div class="space-y-4">
				<UFormGroup label="Минимальная цена" name="minPrice">
					<UInput :model-modifiers="{number: true}" type="number" v-model="listingFormData.minPrice" />
				</UFormGroup>
				<PeriodsCreater v-model="listingFormData.pricePeriods"/>
			</div>
		</UCard>
	
		
		<UCard class="-mx-4">
			<h2 class="font-semibold text-xl mb-4">Правила проживания</h2>
			<div class="space-y-4">
				<UFormGroup label="Максимальная вместительность человек" name="places">
					<UInput :model-modifiers="{number: true}" type="number" v-model="listingFormData.places" />
				</UFormGroup>
				<div class="flex gap-4">
					<UToggle v-model="listingFormData.monthlyRental"/>
					<span>Возможна помесячная аренда?</span>
				</div>
				<div class="flex gap-4">
					<UToggle v-model="listingFormData.withAnimals"/>
					<span>Можно с животными?</span>
				</div>
			</div>
		</UCard>
		<UCard class="-mx-4">
			<h2 class="font-semibold text-xl mb-4">Параметры объекта</h2>
			<div class="space-y-4">
				<UFormGroup label="Количество комнат (0 - если студия)" name="roomCount">
					<UInput :model-modifiers="{number: true}" type="number" v-model="listingFormData.roomCount" />
				</UFormGroup>
				<UFormGroup label="Какие кровати?"  name="bedDescription">
					<UInput v-model="listingFormData.bedDescription" />
				</UFormGroup>
				<UFormGroup label="Площадь" name="area">
					<UInput :model-modifiers="{number: true}" type="number" v-model="listingFormData.area" />
				</UFormGroup>
				<UFormGroup label="Этаж" name="floor">
					<UInput :model-modifiers="{number: true}" type="number" v-model="listingFormData.floor" />
				</UFormGroup>
				<UFormGroup label="Этажей в доме" name="maxFloor">
					<UInput :model-modifiers="{number: true}" type="number" v-model="listingFormData.maxFloor" />
				</UFormGroup>
				<UFormGroup label="Балкон" name="balcony">
					<USelect v-model="listingFormData.balcony" :options="balconyProperties"/>
				</UFormGroup>
				<UFormGroup label="Парковка" name="parkingDescription">
					<USelect v-model="listingFormData.parkingDescription" :options="parkingProperties"/>
				</UFormGroup>
				<UFormGroup label="Описание вида" name="viewDescription">
					<UInput v-model="listingFormData.viewDescription" />
				</UFormGroup>
				<UFormGroup label="Техника" name="appliances">
					<USelectMenu placeholder="Выбери технику" multiple v-model="listingFormData.appliances" :options="appliancesProperties"/>
				</UFormGroup>
				<UKbd v-for="i of listingFormData.appliances" class="mr-2">{{i}}</UKbd>
				<UFormGroup label="Интернет и тв" name="internetAndTV">
					<USelectMenu placeholder="Выбери Интернет и тв" multiple v-model="listingFormData.internetAndTV" :options="internetAndTVProperties"/>
				</UFormGroup>
				<UKbd v-for="i of listingFormData.internetAndTV" class="mr-2">{{i}}</UKbd>
				<UFormGroup label="Удобства" name="amenities">
					<USelectMenu placeholder="Выбери Удобства" multiple v-model="listingFormData.amenities" :options="amenitiesProperties"/>
				</UFormGroup>
				<UKbd v-for="i of listingFormData.amenities" class="mr-2">{{i}}</UKbd>
			</div>
		</UCard>
		<FileUploader v-model="listingFormData.photos"/>
		<SetLocation/>
		<UButton type="submit" v-if="!updateMode" :loading="loading">
			 Загрузить объект
		</UButton>
		<UButton type="submit" v-else :loading="loading">
			Обновить объект
		</UButton>
		
	</UForm>

</template>

<style scoped lang="scss">

</style>