<template>
	<NuxtLayout>
		<NuxtPage/>
		<BurgerMenuModal/>
	</NuxtLayout>
	<UNotifications />
</template>


<style lang="scss">
	@import "~/common/scss/main";
</style>
<script setup lang="ts">
	import BurgerMenuModal from "~/modules/menu/components/BurgerMenuModal.vue";
</script>