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
	// use 10 second polling to check changes
	// setInterval(() => {
	//     usePolling();
	// }, 10000);

	// subscribe to notifications
	realtimeChannelNotifications = client
		.channel("public:notifications")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "notifications",
				// filter: "id=eq." + String(user.value?.id),
			},
			() => useRefreshNotifications()
		)
		.subscribe();
});

onUnmounted(() => {
	client.removeChannel(realtimeChannelNotifications);
});

watchEffect(() => {
	if (user.value) {
		useGetUser();
	} else {
		console.log("No user");
	}
});
</script>
