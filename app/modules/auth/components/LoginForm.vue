<script setup lang="ts">
import { AuthAPI } from '~/modules/auth/api/auth.api'

const emit = defineEmits(['onSuccess'])

const emailInput = ref<string | undefined>(undefined)

const isLoading = ref(false)
const serverErrors = ref<string[]>([])

async function submit() {
  isLoading.value = true
  serverErrors.value = []
  try {
    if (!emailInput.value) {
      serverErrors.value = ['Некорректный формат почты']
      return
    }
    const { email } = await AuthAPI.login({
      email: emailInput.value.toLowerCase().trim()
    })
    emit('onSuccess', email)
  } catch (error: unknown) {
    const message = (error as { data?: { message?: string } }).data?.message
    if (message) {
      serverErrors.value = [message]
    } else {
      serverErrors.value = ['Произошла ошибка при входе в аккаунт']
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm @submit.prevent="submit">
    <UCard>
      <template #header>
        <p class="text-base font-semibold leading-6 text-gray-900">
          Вход в аккаунт
        </p>
        <p class="mt-1 text-sm text-gray-500">
          Введите свою электронную почту, затем мы отправим на нее код подтверждения.
        </p>
      </template>

      <UFormField label="email">
        <UInput v-model="emailInput" class="w-full" required type="email" />
      </UFormField>

      <template #footer>
        <UButton type="submit" :loading="isLoading">
          Получить код
        </UButton>
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

<style scoped lang="scss"></style>
