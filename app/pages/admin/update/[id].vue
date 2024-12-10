<script setup lang="ts">
import ListingForm from "~/modules/admin/components/ListingForm.vue";
import MenuMain from "~/modules/menu/components/MenuMain.vue";

definePageMeta({
	middleware: ['admin-only']
})

</script>

<template>
	<MenuMain/>
	<div class="wrapper py-8">
		<ListingForm update-mode/>
	</div>


</template>

<style scoped lang="scss">

</style>