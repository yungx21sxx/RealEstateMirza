<script setup lang="ts">

import MenuMain from "~/modules/menu/components/MenuMain.vue";
import ContactsBlock from "~/modules/mainPage/ContactsBlock.vue";
import ReviewsWidget from "~/modules/mainPage/ReviewsWidget.vue";
</script>

<template>
	<MenuMain/>
	<ContactsBlock/>
	<div class="wrapper py-8 rounded-xl" style="position:relative;overflow:hidden;">
		<iframe src="https://yandex.com/map-widget/v1/org/sky_apartment_mirza/117668261158/reviews/?ll=37.380588%2C55.713527&utm_content=read-more&utm_medium=reviews&utm_source=maps-reviews-widget&z=17" height="500" frameborder="1" allowfullscreen="true" style="position:relative; width: 100%; border-radius: 12px"></iframe>
	</div>
</template>

<style scoped lang="scss">

</style>