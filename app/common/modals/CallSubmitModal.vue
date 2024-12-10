<script setup lang="ts">

import useModals from "~/common/composables/useModals";
import CallSubmitForm from "~/common/forms/CallSubmitForm.vue";

const {closeCallSubmitModal, callSubmitModal} = useModals()

</script>

<template>
	
	<UModal v-model="callSubmitModal">
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Заявка на звонок
					</h3>
					<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeCallSubmitModal" />
				</div>
			</template>
			<CallSubmitForm @onSubmit="closeCallSubmitModal"/>
		</UCard>
	</UModal>
	
</template>

<style scoped lang="scss">

</style>