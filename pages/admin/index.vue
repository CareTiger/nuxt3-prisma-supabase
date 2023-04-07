<template>
	<div>
		<h1 class="text-center text-4xl">Admin</h1>
	</div>
</template>

<script setup>
definePageMeta({
	middleware: ["auth", "admin"],
});
</script>
