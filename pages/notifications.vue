<template>
	<div>
		<h1 class="text-center text-4xl">Notifications</h1>
		<ul class="grid place-items-center max-w-md mx-auto mt-8">
			<li
				class="w-full"
				v-for="notification in userStore.profile.notifications"
				:key="notification.id"
			>
				<p
					:class="[
						notification.read ? `bg-slate-800` : `bg-slate-600`,
					]"
					class="flex flex-row justify-between p-4 mb-2 w-full"
				>
					{{ notification.message }}
				</p>
			</li>
		</ul>
	</div>
</template>
<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
	middleware: ["auth"],
});

onUnmounted(async () => {
	const data = await client.rpc("mark_notifications_as_read", {
		auth_id: userStore.profile.id,
	});
});

watchEffect(() => {
	if (!user.value) {
		navigateTo("/auth/login");
	}
});
</script>
