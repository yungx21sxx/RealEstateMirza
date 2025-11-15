<script setup lang="ts">
  import MenuFixed from '~/modules/menu/components/MenuFixed.vue';
  import CFooter from '~/common/CFooter.vue';
</script>

<template>
  <div>
    <MenuFixed />
    <slot />
    <CFooter />
  </div>
</template>

<style scoped></style>
