<template>
	<div class="w-full">
		<h1 class="text-center text-4xl">Dashboard</h1>
		<div class="mt-10 grid place-items-center">
			<img
				class="w-96 h-96 rounded-2xl"
				:src="userStore.profile.avatar_url"
				alt="avatar"
			/>
			<p class="mt-4">id - {{ userStore.profile.id }}</p>
			<p class="mt-4">email - {{ userStore.profile.email }}</p>
		</div>
	</div>
</template>
<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const user = useSupabaseUser();
definePageMeta({
	middleware: ["auth"],
});
</script>
