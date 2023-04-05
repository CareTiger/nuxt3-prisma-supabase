<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";
const client = useSupabaseClient();
let realtimeChannelNotifications = RealtimeChannel;

onMounted(async () => {
    // subscribe to notifications
    realtimeChannelNotifications = client
        .channel("public:Notification")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "Notification" },
            () => refreshNotifications()
        );
    realtimeChannelNotifications.subscribe();
});

function refreshNotifications() {
    console.log("Fetching notifications");
}

onUnmounted(() => {
    client.removeChannel(realtimeChannelNotifications);
});
</script>
