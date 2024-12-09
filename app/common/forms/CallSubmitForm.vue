<script setup lang="ts">
	import type {FormError, FormSubmitEvent} from '#ui/types'
	const emits = defineEmits<{
		onSubmit: () => void
	}>();
	
	
	
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
	
	async function onSubmit(event: FormSubmitEvent<any>) {
		console.log(event.data)
	}


</script>

<template>
	
	<UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormGroup label="Почта" name="email">
			<UInput v-model="state.name" type="email"/>
		</UFormGroup>
		
		<UFormGroup label="Телефон" name="phone">
			<UInput v-model="state.phone"/>
		</UFormGroup>
		
		<UFormGroup label="Ваш вопрос (необязательно)">
			<UTextarea v-model="state.question" />
		</UFormGroup>
		
		<UButton type="submit" class="mt-10" block>
			Отправить заявку
		</UButton>
	</UForm>
	<p class="text-gray-500 mt-6 text-sm text-center max-md:text-xs">Нажимая кнопку "Отправить Заявку", вы соглашаетесь с условиями <a href="">пользовательского соглашения</a> и на <a href="">обработку персональных данных</a> </p>
</template>

<style scoped lang="scss">

</style>