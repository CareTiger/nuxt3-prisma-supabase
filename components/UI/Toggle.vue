<template>
	<div
		:class="modelValue ? 'bg-green-500' : 'bg-gray-300'"
		@click="toggle"
		class="w-14 h-8 transition-all duration-500 flex items-center rounded-full p-1"
	>
		<div
			:class="{ 'translate-x-6': modelValue }"
			class="w-6 h-6 transition-all duration-500 transform bg-white rounded-full shadow-md"
		></div>
	</div>
</template>

<script setup>
// https://medium.com/front-end-weekly/build-a-html-toggle-switch-in-just-7-lines-of-code-using-vue-tailwindcss-ed215394fcd
// https://www.youtube.com/watch?v=Qk6vsmWd4O8&t=2s

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(["update"]);

function toggle() {
	emit("update", !props.modelValue);
}
</script>
