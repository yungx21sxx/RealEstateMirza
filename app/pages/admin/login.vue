<script setup lang="ts">
  import MenuMain from '~/modules/menu/components/MenuMain.vue';
  import type { H3Error } from 'h3';
  import LoginForm from '~/modules/auth/components/LoginForm.vue';
  import OtpConfirmCode from '~/modules/auth/components/OtpConfirmCode.vue';
  import type { LoginResponse } from '#shared/types/auth.types';
  import { AuthAPI } from '~/modules/auth/api/auth.api';
  import { useAuth } from '~/modules/auth/composables/useAuth';

  const otpCode = ref<number[] | undefined>(undefined);
  const isLoading = ref(false);
  const serverErrors = ref<string[]>([]);

  async function sendNewCode() {
    try {
      await $fetch('/api/auth/send-verification-code', {
        method: 'POST',
        body: {
          email: currentEmail.value,
        },
      });
    } catch (error) {
      console.log(error);
      if (error && error.data) {
        serverErrors.value = [error.data.message];
      } else {
        serverErrors.value = ['Произошла ошибка при подтверждении кода'];
      }
    }
  }

  const items = [
    {
      slot: 'email',
      label: 'Вход в аккаунт',
      value: 'email',
    },
    {
      slot: 'otp',
      label: 'Подтверждение',
      value: 'otp',
    },
  ];

  const step = ref<'email' | 'otp'>('email');

  const currentEmail = ref<null | string>(null);

  function onLoginSuccess(email: string) {
    step.value = 'otp';
    currentEmail.value = email;
    localStorage.setItem('auth-step', 'otp');
    localStorage.setItem('email', email);
  }

  onMounted(() => {
    const authStepJSON = localStorage.getItem('auth-step');
    const emailCacheJSON = localStorage.getItem('email');

    if (authStepJSON) {
      step.value = authStepJSON as 'email' | 'otp'; // parseInt не требует JSON.parse
    }

    if (emailCacheJSON) {
      currentEmail.value = emailCacheJSON; // Просто присваиваем строку
    }
  });

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
        code: otpCode.value.join(''),
      });
      const { setAuthUser } = useAuth();
      setAuthUser(user);
      localStorage.removeItem('auth-step');
      localStorage.removeItem('email');
      await navigateTo({
        path: `/admin/create-listing`,
      });
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
  <MenuMain />
  <div class="wrapper login-wrapper">
    <UContainer class="mt-8 mb-8 max-w-xl">
      <UTabs v-model="step" :items="items" class="w-full">
        <template #email="{ item }">
          <LoginForm @on-success="onLoginSuccess" />
        </template>

        <template #otp="{ item }">
          <UForm @submit.prevent="handleOtpConfirm">
            <UCard>
              <template #header>
                <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                  Подтвердите ваш код
                </p>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Введите свою электронную почту, затем мы отправим на нее код подтверждения.
                </p>
              </template>
              <UFormField label="Код подтверждения">
                <UPinInput v-model="otpCode" otp :length="6" type="number" class="w-full" />
              </UFormField>
              <template #footer>
                <UButton type="submit" :loading="isLoading"> Подтвердить </UButton>
                <div class="mt-4">
                  Не получили код?
                  <a class="ml-2 text-blue-700" href="#" @click.prevent="sendNewCode"
                    >Отправить новый</a
                  >
                </div>
                <div class="mt-4">
                  Изменить почту?
                  <a class="ml-2 text-blue-700" href="#" @click.prevent="step = 0"
                    >Вернуться назад</a
                  >
                </div>
                <div v-if="serverErrors.length" style="color: red; margin-top: 16px">
                  <ul>
                    <li v-for="(error, index) in serverErrors" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </template>
            </UCard>
          </UForm>
        </template>
      </UTabs>
    </UContainer>
  </div>
</template>

<style scoped lang="scss">
  .login-wrapper {
    min-height: calc(100svh - 50px - 300px);
  }
</style>
