<script setup lang="ts">

	import useListing from "~/modules/listing/composables/useListing";
	
	const {listing} = useListing();
</script>

<template>
	<div class="listing-card">
		<h2 class="listing-title">Описание</h2>
		<p class="whitespace-break-spaces">{{listing.description}}</p>
	</div>

</template>

<style scoped lang="scss">

</style>