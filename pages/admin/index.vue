<template>
	<div>Admin Page</div>
</template>

<script setup>
definePageMeta({
	middleware: ["auth", "admin"],
});
</script>
