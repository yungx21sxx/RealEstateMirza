<script setup lang="ts">
import type { FormError } from '#ui/types'
import useTelegram from '~/common/composables/useTelegram'

const emits = defineEmits(['onSubmit'])

interface CallSubmitFormState {
  name?: string
  phone?: string
  question?: string
  personalDataConsent: boolean
}

const state = reactive<CallSubmitFormState>({
  name: undefined,
  phone: undefined,
  question: undefined,
  personalDataConsent: false
})

function validate(state: CallSubmitFormState): FormError[] {
  const errors = []
  if (!state.name)
    errors.push({ name: 'name', message: 'Введите имя' })
  if (!state.phone?.trim())
    errors.push({ name: 'phone', message: 'Введите номер телефона' })
  if (!state.personalDataConsent)
    errors.push({ name: 'personalDataConsent', message: 'Необходимо согласие на обработку персональных данных' })
  return errors
}

const loading = ref(false)

async function onSubmit() {
  if (loading.value || !state.name || !state.phone || !state.personalDataConsent) {
    return
  }
  const { fetchForCallData } = useTelegram()
  const toast = useToast()
  loading.value = true
  try {
    await fetchForCallData(state.phone, state.name, state.question)
    state.personalDataConsent = false
    emits('onSubmit')
    toast.add({
      title: 'Заявка отправлена!',
      icon: 'i-material-symbols:check-circle-outline-sharp',
      description: 'Оператор свяжется с вами в ближайшее время.'
    })
  } catch {
    toast.add({
      title: 'Не удалось отправить заявку',
      description: 'Попробуйте позже.',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Как Вас зовут?" name="name">
      <UInput v-model="state.name" class="w-full" />
    </UFormField>

    <UFormField label="Номер телефона" name="phone">
      <UInput v-model="state.phone" class="w-full" />
    </UFormField>

    <UFormField label="Ваш вопрос (необязательно)">
      <UTextarea v-model="state.question" class="w-full" />
    </UFormField>

    <UFormField name="personalDataConsent">
      <UCheckbox v-model="state.personalDataConsent" :disabled="loading" required>
        <template #label>
          Я даю
          <NuxtLink to="/obrabotka_personalnyh_dannyh" target="_blank" rel="noopener noreferrer" class="text-accent-700 underline underline-offset-2" @click.stop>
            согласие на обработку персональных данных
          </NuxtLink>
          и ознакомлен(а) с
          <NuxtLink to="/politika_konfidencialnosti" target="_blank" rel="noopener noreferrer" class="text-accent-700 underline underline-offset-2" @click.stop>
            политикой конфиденциальности
          </NuxtLink>.
        </template>
      </UCheckbox>
    </UFormField>

    <UButton type="submit" block :loading="loading" :disabled="!state.personalDataConsent">
      Отправить заявку
    </UButton>
  </UForm>
</template>

<style scoped lang="scss"></style>
