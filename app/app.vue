<script setup lang="ts">
import CallSubmitModal from '~/common/modals/CallSubmitModal.vue'
import BurgerMenuModal from '~/modules/menu/components/BurgerMenuModal.vue'

const toaster = { max: 3 }
onMounted(async () => {
  void import('v-calendar/style.css')
})
</script>

<template>
  <NuxtLoadingIndicator />
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <BurgerMenuModal />
    <CallSubmitModal />
  </UApp>
</template>

<style lang="scss"></style>
