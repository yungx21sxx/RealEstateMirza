<script setup lang="ts">
import {AuthAPI} from "~/modules/auth/api/auth.api";
import type {H3Error} from "h3";

const emit = defineEmits(['onSuccess']);


const emailInput = ref<string | undefined>(undefined);

const isLoading = ref(false);
const serverErrors = ref<string[]>([]);

const submit = async () => {
	
	isLoading.value = true;
	serverErrors.value = [];
	try {
		if (!emailInput.value) {
			serverErrors.value = ['Некорректный формат почты'];
			return;
		}
		const { email } = await AuthAPI.login({
			email: emailInput.value.toLowerCase().trim(),
		});
		emit('onSuccess', email);
	} catch (error: H3Error) {
		if (error && error.data) {
			serverErrors.value = [error.data.message];
		} else {
			serverErrors.value = ['Произошла ошибка при входе в аккаунт'];
		}
	} finally {
		isLoading.value = false;
	}
};

</script>

<template>
	<UCard @submit.prevent="submit">
		<template #header>
			<p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
				Вход в аккаунт
			</p>
			<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
				Введите свою электронную почту, затем мы отправим на нее код подтверждения.
			</p>
		</template>
		
		<UFormGroup label="email">
			<UInput required type="email" v-model="emailInput" />
		</UFormGroup>
		
		<template #footer>
			<UButton type="submit" :loading="isLoading">
				Получить код
			</UButton>
			<div v-if="serverErrors.length" style="color: red; margin-top: 16px;">
				<ul>
					<li v-for="(error, index) in serverErrors" :key="index">
						{{ error }}
					</li>
				</ul>
			</div>
		</template>
	</UCard>

</template>

<style scoped lang="scss">

</style>