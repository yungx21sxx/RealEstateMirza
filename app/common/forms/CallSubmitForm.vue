<script setup lang="ts">
	import type {FormError, FormSubmitEvent} from '#ui/types'
	import PhoneInput from "~/common/inputs/PhoneInput.vue";
	import useTelegram from "~/common/composables/useTelegram";
	
	const emits = defineEmits(['onSubmit']);
	
	
	
	const state = reactive({
		name: undefined,
		phone: undefined,
		question: undefined
	})
	
	const validate = (state: any): FormError[] => {
		const errors = []
		if (!state.name) errors.push({ path: 'email', message: 'Введите имя' })
		if (!state.phone) errors.push({ path: 'phone', message: 'Введите номер телелфона' })
		return errors
	}
	
	const loading = ref(false);
	
	async function onSubmit(event: FormSubmitEvent<any>) {
		loading.value = true;
		const {fetchForCallData} = useTelegram();
		if (!state.name || !state.phone) {
			return;
		}
		await fetchForCallData(state.phone, state.name, state.question);
		loading.value = false;
		const toast = useToast()
		emits('onSubmit');
		toast.add({ title: 'Заявка отправлена!' })
	}


</script>

<template>
	
	<UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormGroup label="Как Вас зовут?" name="name">
			<UInput v-model="state.name"/>
		</UFormGroup>
		
		<UFormGroup label="Телефон" name="phone">
			<PhoneInput v-model="state.phone"/>
		</UFormGroup>
		
		<UFormGroup label="Ваш вопрос (необязательно)">
			<UTextarea v-model="state.question" />
		</UFormGroup>
		
		<UButton type="submit" class="mt-10" block :loading="loading">
			Отправить заявку
		</UButton>
	</UForm>
	<p class="text-gray-500 mt-6 text-sm text-center max-md:text-xs">Нажимая кнопку "Отправить Заявку", вы соглашаетесь с условиями <NuxtLink to="/obrabotka_personalnyh_dannyh" class="text-main">обработки персональных данных</NuxtLink> </p>
</template>

<style scoped lang="scss">

</style>