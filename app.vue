<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";
const user = useSupabaseUser();
const client = useSupabaseClient();
let realtimeChannelNotifications = RealtimeChannel;

onMounted(async () => {
	// use 10 second polling to check changes - BAD
	// setInterval(() => {
	//     usePolling();
	// }, 10000);

	if (!user.value) return;

	// subscribe to notifications channel
	realtimeChannelNotifications = client
		.channel("public:notifications")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "notifications",
				// DON"T NEED THIS FILTER BECAUSE RLS IS SET UP
				// filter: "user_id=eq." + user.value.id,
			},
			() => useRefreshNotifications()
		)
		.subscribe((status) => console.log(status));

	// console.log(client.getChannels());
});

onUnmounted(() => {
	client.removeChannel(realtimeChannelNotifications);
});

watchEffect(() => {
	if (user.value) {
		useGetUser();
	} else {
		console.log("app.vue No user");
	}
});
</script>
