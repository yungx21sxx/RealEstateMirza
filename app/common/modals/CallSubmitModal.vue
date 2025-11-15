<script setup lang="ts">
  import useModals from '~/common/composables/useModals';
  import CallSubmitForm from '~/common/forms/CallSubmitForm.vue';

  const { isMobile } = useDevice();
  const { closeCallSubmitModal, callSubmitModal } = useModals();
</script>

<template>
  <UModal v-model:open="callSubmitModal" :fullscreen="isMobile">
    <template #header>
      <div class="flex items-center justify-between w-full">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Заявка на звонок
        </h3>
        <UButton
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="closeCallSubmitModal"
        />
      </div>
    </template>
    <template #body>
      <CallSubmitForm @on-submit="closeCallSubmitModal" />
    </template>
  </UModal>
</template>

<style scoped lang="scss"></style>
