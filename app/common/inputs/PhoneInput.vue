<template>
	<div>
		<VueTelInput @on-input="setPhone"/>
		<p class="text-red-500 text-sm mt-2" v-if="!inputValid">Номер введен не правильно</p>
	</div>
	
</template>

<script setup lang="ts">

import {VueTelInput} from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';


const modelValue = defineModel();

interface IPhoneParams {
	country: string
	countryCode: string
	formatted: string
	nationalNumber : string
	number: string
	possible: boolean
	valid: boolean
}

const inputValid = ref(true);

const setPhone = (phone: string, params: IPhoneParams) => {
	if (phone.length === 0) return;
	inputValid.value = params.valid;
	modelValue.value = params.formatted;
}

</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>