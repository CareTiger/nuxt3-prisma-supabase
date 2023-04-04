<template>
    <div class="my-2 p-2 rounded-lg border border-slate-500">
        <p>{{ content }}</p>
        <div class="mt-3 flex flex-row items-center justify-between text-sm">
            <p
                class="text-blue-500 italic"
                @click="
                    userDetails({
                        authId: authorId,
                        username: author,
                    })
                "
            >
                {{ author }}
            </p>
            <p>{{ date }}</p>
        </div>
    </div>
</template>
<script setup>
import { useSiteStore } from "~~/store/site";

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
});

function userDetails({ authId, username }) {
    console.log(authId, username);
    const siteStore = useSiteStore();
    siteStore.setGuestDetails({ authId, username });
    return navigateTo({
        path: "/n/" + username,
    });
}
</script>
