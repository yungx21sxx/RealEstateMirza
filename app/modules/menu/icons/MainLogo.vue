<script setup lang="ts">

import type {MenuVariants} from "~/modules/menu/types/menu.types";

const {variant = 'dark'} = defineProps<{
	variant?: MenuVariants
}>();

</script>

<template>
	<h3 :class="['font-semibold text-2xl', {
		'text-white': variant === 'light'
	}]">Логотип</h3>
</template>

<style scoped lang="scss">

</style>