<template>
	<NuxtLoadingIndicator/>
	<NuxtLayout>
		<NuxtPage/>
	</NuxtLayout>
	<BurgerMenuModal/>
	<UNotifications />
	<CallSubmitModal/>
</template>


<style lang="scss">
	@import "~/common/scss/main";
</style>
<script setup lang="ts">
	import BurgerMenuModal from "~/modules/menu/components/BurgerMenuModal.vue";
	import CallSubmitModal from "~/common/modals/CallSubmitModal.vue";
</script>