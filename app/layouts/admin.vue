<script setup lang="ts">
import MenuMain from '~/modules/menu/components/MenuMain.vue'
</script>

<template>
  <div>
    <MenuMain />
    <div class="wrapper py-8">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
