<template>
	<div>
		<h1 class="text-center text-4xl">Landing Page</h1>
	</div>
</template>
<script setup>
const user = useSupabaseUser();
watchEffect(() => {
	if (user.value) {
		navigateTo("/dashboard");
	}
});
</script>
