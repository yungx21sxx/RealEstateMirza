<script setup lang="ts">
import CFooter from '~/common/CFooter.vue'
import MenuFixed from '~/modules/menu/components/MenuFixed.vue'
</script>

<template>
  <div>
    <MenuFixed />
    <slot />
    <CFooter />
  </div>
</template>

<style scoped></style>
