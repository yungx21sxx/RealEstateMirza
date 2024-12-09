<script setup lang="ts">

    import MenuMain from '~/modules/menu/components/MenuMain.vue';
</script>

<template>

    <MenuMain/>
    <div class="wrapper py-8">
        <slot/>
    </div>

</template>

<style scoped>

</style>