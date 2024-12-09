<script setup lang="ts">

import MenuFixed from "~/modules/menu/components/MenuFixed.vue";
import CFooter from "~/common/CFooter.vue";
</script>

<template>
	<MenuFixed/>
	<slot/>
	<CFooter/>
</template>

<style scoped>

</style>