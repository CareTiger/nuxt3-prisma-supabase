<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";
const client = useSupabaseClient();
let realtimeChannelNotifications = RealtimeChannel;
const userId = 1;

onMounted(async () => {
    // subscribe to notifications
    realtimeChannelNotifications = client
        .channel("public:notifications")
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "notifications",
                filter: "user_id=eq." + userId,
            },
            () => refreshNotifications()
        )
        .subscribe();
});

function refreshNotifications() {
    console.log("Fetching notifications");
}

onUnmounted(() => {
    client.removeChannel(realtimeChannelNotifications);
});
</script>
