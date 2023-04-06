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
    // subscribe to notifications
    realtimeChannelNotifications = client
        .channel("public:notifications")
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "notifications",
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
