<template>
	<div class="w-full">
		<h1 class="text-center text-4xl">Dashboard</h1>
		<pre>
            <code>
                {{ user.id }} - {{ user.email }}
            </code>
        </pre>
	</div>
</template>
<script setup>
const user = useSupabaseUser();
definePageMeta({
	middleware: ["auth"],
});
</script>
