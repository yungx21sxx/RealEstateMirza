<script setup lang="ts">
	import {
		initYmaps,
		YandexMap, YandexMapControls,
		YandexMapDefaultFeaturesLayer,
		YandexMapDefaultSchemeLayer, YandexMapMarker,
		YandexMapZoomControl,
	} from "vue-yandex-maps";
	import type {Feature, YMap} from "@yandex/ymaps3-types";
	import useListingFormData from "~/modules/admin/state/useListingFormData";
	import {useDebounce} from "~/common/composables/useDebounce";
	const {listingFormData} = useListingFormData();
	
	interface IAddressSearchResponse {
		address: string | null,
		longitude: number | null,
		latitude: number | null,
	}
	
	const selectedAddress = ref<IAddressSearchResponse>({
		address: null,
		longitude: null,
		latitude: null
	});
	const searchQuery = ref('');
	const map = shallowRef<null | YMap>(null);
	
	const setAddress = (address: IAddressSearchResponse) => {
		listingFormData.value.address = address.address;
		listingFormData.value.longitude = address.longitude
		listingFormData.value.latitude = address.latitude
	}
	
	if (listingFormData.value.longitude && listingFormData.value.latitude && listingFormData.value.address) {
		selectedAddress.value = {
			address: listingFormData.value.address,
			latitude: listingFormData.value.latitude,
			longitude: listingFormData.value.longitude
		}
	}

	const fetchAddresses = async (query: string): Promise<IAddressSearchResponse[]> => {
		await initYmaps();
		const addresses = await ymaps3.search({text: query});
		return addresses.map(address => ({
			address: address.properties.name,
			latitude: address.geometry?.coordinates[1],
			longitude: address.geometry?.coordinates[0]
		}))
	};
	
	const { debounce } = useDebounce()
	
	watch(searchQuery, debounce(() => {
		fetchAddresses(searchQuery.value)
	}, 200));
	
	const search = async (q: string) => {
		return fetchAddresses(q)
	}
	
	watch(selectedAddress, () => {
		if (selectedAddress.value.address && selectedAddress.value.longitude && selectedAddress.value.latitude) {
			setAddress(selectedAddress.value)
		}
	})

</script>

<template>
	<UCard class="address -mx-4">
		<template #header>
			<h2 class="text-xl font-semibold mb-2">Рассположение</h2>
			<p>Введите полный адрес, затем выберите его в выпадающем меню. Если объект не имеет адреса/номера дома, то введите приблизительный и укажите координаты.</p>
		</template>
		<UInputMenu
			v-model="selectedAddress"
			:search="search"
			placeholder="Поиск адреса..."
			option-attribute="address"
			trailing
		/>
		<div class="map listingFormData-block" v-if="selectedAddress.address && selectedAddress.longitude && selectedAddress.latitude">
			<h2 class="mb-2 mt-4 font-semibold text-lg">Жилье на карте</h2>
			<p class="mb-4"> <strong>Улица дом:</strong> {{ selectedAddress.address }}</p>
			
			<yandex-map
				v-model="map"
				class="map__canvas"
				:settings="{
		        location: {
		          center: [selectedAddress.longitude, selectedAddress.latitude],
		          zoom: 17,
		        },
             }"
				width="100%"
			>
				<yandex-map-default-scheme-layer/>
				<yandex-map-default-features-layer/>
				<yandex-map-controls :settings="{ position: 'right' }">
					<yandex-map-zoom-control/>
				</yandex-map-controls>
				<yandex-map-marker
					position="top left-center"
					v-if="selectedAddress.longitude && selectedAddress.latitude"
					:settings="{
                    coordinates: [selectedAddress.longitude, selectedAddress.latitude],
                }"
				>
					<div class="marker">
						<UIcon class="text-accent-50 h-6 w-6" name="i-material-symbols:house-outline"></UIcon>
					</div>
				</yandex-map-marker>
			
			</yandex-map>
		</div>
	</UCard>

</template>

<style scoped lang="scss">
	.marker {
		top: 50%;
		left: 100%;
		right: 100%;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 2px solid #fff;
		@apply bg-accent;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.map {
		&__canvas {
			height: 500px !important;
			
			@media screen and (max-width: 600px ){
				height: 350px !important;
			}
		}
	}

</style>

