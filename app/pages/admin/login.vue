<script setup lang="ts">
import MenuMain from "~/modules/menu/components/MenuMain.vue";
import type {H3Error} from "h3";
import LoginForm from "~/modules/auth/components/LoginForm.vue";
import OtpConfirmCode from "~/modules/auth/components/OtpConfirmCode.vue";
import type {LoginResponse} from "#shared/types/auth.types";
import {AuthAPI} from "~/modules/auth/api/auth.api";
import {useAuth} from "~/modules/auth/composables/useAuth";




const otpCode = ref<string | undefined>(undefined);
const isLoading = ref(false);
const serverErrors = ref<string[]>([]);

async function sendNewCode() {
	try {
		await $fetch('/api/auth/send-verification-code', {
			method: "POST",
			body: {
				email: currentEmail.value,
			}
		});
	} catch (error) {
		console.log(error)
		if (error && error.data) {
			serverErrors.value = [error.data.message];
		} else {
			serverErrors.value = ['Произошла ошибка при подтверждении кода'];
		}
	}
}

const items = [{
	slot: 'email',
	label: 'Вход в аккаунт'
}, {
	slot: 'otp',
	label: 'Подтверждение'
}]

const step = ref(0);

const currentEmail = ref<null | string>(null)

function onLoginSuccess(email: string) {
	step.value = 1;
	currentEmail.value = email;
	localStorage.setItem('auth-step', String(1));
	localStorage.setItem('email', email);
}

onMounted(() => {
	const authStepJSON = localStorage.getItem('auth-step');
	const emailCacheJSON = localStorage.getItem('email');
	
	if (authStepJSON) {
		step.value = parseInt(authStepJSON, 10); // parseInt не требует JSON.parse
	}
	
	if (emailCacheJSON) {
		currentEmail.value = emailCacheJSON; // Просто присваиваем строку
	}
})

async function handleOtpConfirm() {
	isLoading.value = true;
	serverErrors.value = [];
	
	if (!currentEmail.value) {
		serverErrors.value = ['Повторно введите почту'];
		isLoading.value = false;
		return;
	}
	
	if (!otpCode.value) {
		serverErrors.value = ['Введите код'];
		isLoading.value = false;
		return;
	}
	
	try {
		const user = await AuthAPI.verifyAuth({
			email: currentEmail.value,
			code: otpCode.value.toString().trim()
		})
		const {setAuthUser} = useAuth();
		setAuthUser(user);
		localStorage.removeItem('auth-step');
		localStorage.removeItem('email');
		await navigateTo({
			path: `/admin/create-listing`
		})
	} catch (error: H3Error) {
		if (error && error.data) {
			serverErrors.value = [error.data.message];
		} else {
			serverErrors.value = ['Произошла ошибка при подтверждении кода'];
		}
	} finally {
		isLoading.value = false;
	}
}



</script>

<template>
	<MenuMain/>
	<div class="wrapper login-wrapper">
		<UContainer class="mt-8 mb-8 max-w-xl">
			<UTabs :items="items" class="w-full" v-model="step">
				<template #email="{ item }">
					<LoginForm @onSuccess="onLoginSuccess"/>
				</template>
				
				<template #otp="{ item }">
					<UCard @submit.prevent="handleOtpConfirm">
						<template #header>
							<p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
								Подтвердите ваш код
							</p>
							<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
								Введите свою электронную почту, затем мы отправим на нее код подтверждения.
							</p>
						</template>
						<UFormGroup label="Код подтверждения">
							<UInput type="number" v-model="otpCode"/>
						</UFormGroup>
						<template #footer>
							<UButton type="submit" :loading="isLoading">
								Подтвердить
							</UButton>
							<div class="mt-4">
								Не получили код? <a class="ml-2 text-blue-700" href="#" @click.prevent="sendNewCode">Отправить новый</a>
							</div>
							<div class="mt-4">
								Изменить почту? <a class="ml-2 text-blue-700" href="#" @click.prevent="step = 0">Вернуться назад</a>
							</div>
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
			</UTabs>
		</UContainer>
	</div>
</template>


<style scoped lang="scss">
	.login-wrapper {
		min-height:calc(100svh - 50px - 300px);
	}
</style>
