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

<script setup lang="ts">
  import BurgerMenuModal from '~/modules/menu/components/BurgerMenuModal.vue';
  import CallSubmitModal from '~/common/modals/CallSubmitModal.vue';
  const toaster = { max: 3 };
</script>
<style lang="scss"></style>
