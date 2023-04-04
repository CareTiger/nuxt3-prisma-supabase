<template>
    <div>Notifications</div>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";
const client = useSupabaseClient();
let realtimeChannel = RealtimeChannel;

// Fetch users and get the refresh method provided by useAsyncData
// const { data: users, refresh: refreshCollaborators } = await useAsyncData(
//     "users",
//     async () => {
//         console.log("Fetching users");
//         const { data } = await client.from("user").select("username");
//         return data;
//     }
// );
async function refreshUsers() {
    console.log("Fetching users");
    const { data } = await client.from("User").select("username");
    console.log(data);
    return data;
}
// Once page is mounted, listen to changes on the `user` table and refresh user when receiving event
onMounted(async () => {
    const { data, error } = await client.from("countries").select("*");
    console.log(data);
    // Real time listener for new workouts
    // realtimeChannel = client
    //     .channel("public:User")
    //     .on(
    //         "postgres_changes",
    //         { event: "*", schema: "public", table: "User" },
    //         () => refreshUsers()
    //     );
    // realtimeChannel.subscribe();
    // console.log(realtimeChannel);
});
// Don't forget to unsubscribe when user left the page
onUnmounted(() => {
    client.removeChannel(realtimeChannel);
});
</script>
