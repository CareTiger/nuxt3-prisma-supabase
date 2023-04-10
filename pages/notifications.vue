<template>
	<div>
		<h1 class="text-center text-4xl">Notifications</h1>
		<ul>
			<li
				v-for="notification in userStore.profile.notifications"
				:key="notification.id"
			>
				<p
					:class="[
						notification.read ? `bg-slate-800` : `bg-slate-600`,
					]"
					class="flex flex-row justify-between p-4 mb-2"
				>
					<span>{{ notification.message }}</span>
					<span>{{ notification.created_at }}</span>
				</p>
			</li>
		</ul>
	</div>
</template>
<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
definePageMeta({
	middleware: ["auth"],
});

onUnmounted(async () => {
	// call the RPC function mark_notifications_as_read()
	// CODE for the RPC function that receives an argument user_id
	// begin
	// update public.notifications
	// set read = true
	// where auth_id = user_id and read = false;
	// end
	const client = useSupabaseClient();
	const data = await client.rpc("mark_notifications_as_read", {
		user_id: userStore.profile.id,
	});
});
</script>
