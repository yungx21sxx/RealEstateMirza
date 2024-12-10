<script setup lang="ts">
	import useListing from "~/modules/listing/composables/useListing";
	import {getRoomLabel} from "~/common/utils/listing.utils";
	
	const {listing} = useListing();
	
	const detailsModal = ref(false);
</script>

<template>
	<div class="listing-card">
		<h2 class="listing-title">
			О квартире
		</h2>
		
		<div class="max-[640px]:block grid grid-cols-2">
			<ul>
				<li>
					Количество комнат: <strong>{{getRoomLabel(listing.roomCount)}}</strong>
				</li>
				<li>
					Кровати: <strong>{{listing.bedDescription}}</strong>
				</li>
				<li>
					Общая площадь: <strong>{{listing.area}} м<sup>2</sup></strong>
				</li>
				<li>
					Этаж: <strong>{{listing.floor}} из {{listing.maxFloor}}</strong>
				</li>
				<li>
					Балкон или лоджия: <strong>{{listing.balcony}}</strong>
				</li>
				<li>
					Вид из окна: <strong>{{listing.viewDescription}}</strong>
				</li>
			</ul>
			
			<UButton variant="link" class="max-[640px]:block hidden p-0 mt-4 text-accent text-base" @click="detailsModal = true">Показать все</UButton>
			<ul class="max-[640px]:hidden">
				<li>
					Техника: <strong>{{listing.appliances.join(', ')}}</strong>
				</li>
				<li>
					Интернет и ТВ: <strong>{{listing.internetAndTV.join(', ')}}</strong>
				</li>
				<li>
					Комфорт: <strong>{{listing.amenities.join(', ')}}</strong>
				</li>
				<li>
					Возможна помесячная аренда: <strong>{{listing.monthlyRental ? 'Да' : 'Нет'}}</strong>
				</li>
			</ul>
		</div>

		<h2 class="listing-title mt-6">
			Правила
		</h2>
		
		<div class="max-[640px]:block max-[640px]:space-y-4 grid grid-cols-2">
			<ul>
				<li>
					Заезд после: <strong>14:00</strong>
				</li>
				<li>
					Выезд до: <strong>12:00</strong>
				</li>
				<li>
					Количество гостей: <strong>{{listing.places}}</strong>
				</li>
				<li>
					Бесконтактное заселение: <strong>Да</strong>
				</li>
				<li>
					Можно с детьми: <strong>Да</strong>
				</li>
			</ul>
			<ul>
				<li>
					Можно с животными: <strong>{{listing.withAnimals ? 'Да' : 'Нет'}}</strong>
				</li>
				<li>
					Можно курить: <strong>Нет</strong>
				</li>
				<li>
					Разрешены вечеринки: <strong>Нет</strong>
				</li>
				<li>
					Есть отчётные документы: <strong>Да</strong>
				</li>
			</ul>
		</div>
		
		<UModal v-model="detailsModal">
			<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							О квартире
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="detailsModal = false" />
					</div>
				</template>
				<div>
					<ul class="space-y-2">
						<li>
							Количество комнат: <strong>{{listing.roomCount}}</strong>
						</li>
						<li>
							Кровати: <strong>{{listing.bedDescription}}</strong>
						</li>
						<li>
							Общая площадь: <strong>{{listing.area}} м<sup>2</sup></strong>
						</li>
						<li>
							Этаж: <strong>{{listing.floor}} из {{listing.maxFloor}}</strong>
						</li>
						<li>
							Балкон или лоджия: <strong>{{listing.balcony}}</strong>
						</li>
						<li>
							Вид из окна: <strong>{{listing.viewDescription}}</strong>
						</li>
						<li>
							Техника: <strong>{{listing.appliances.join(', ')}}</strong>
						</li>
						<li>
							Интернет и ТВ: <strong>{{listing.internetAndTV.join(', ')}}</strong>
						</li>
						<li>
							Комфорт: <strong>{{listing.amenities.join(', ')}}</strong>
						</li>
						<li>
							Возможна помесячная аренда: <strong>{{listing.monthlyRental ? 'Да' : 'Нет'}}</strong>
						</li>
					</ul>
				</div>
			</UCard>
		</UModal>
		
	</div>
</template>

<style scoped lang="scss">

ul {
	@apply space-y-1;
}

</style>