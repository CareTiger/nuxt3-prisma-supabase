<template>
    <div class="my-2 p-2 rounded-lg border border-slate-500">
        <div class="my-3 flex flex-row items-center justify-between text-sm">
            <p
                class="text-blue-500 italic flex flex-row justify-center items-center cursor-pointer"
                @click="
                    userDetails({
                        authId: note.authorId,
                        username: note.author,
                    })
                "
            >
                <img
                    :src="note.author.avatar_url"
                    alt="author image"
                    class="w-8 h-8 rounded-full mr-2"
                />
                {{ note.author.username }}
            </p>
            <p>{{ formatDate(note.createdAt) }}</p>
        </div>
        <p class="font-bold">{{ note.title }}</p>
        <p class="mt-2">{{ note.content }}</p>
        <p class="mt-2">
            <span
                class="mr-2"
                v-for="hashtag in note.hashtags"
                :key="hashtag"
                >{{ hashtag }}</span
            >
        </p>
    </div>
</template>
<script setup>
import { useSiteStore } from "~~/store/site";

const { formatDate } = useUtils();
const props = defineProps({
    note: {
        type: Object,
        required: true,
    },
});

function userDetails({ authId, username }) {
    const siteStore = useSiteStore();
    siteStore.setGuestDetails({ authId, username });
    console.log(siteStore.guestDetails);
    return navigateTo({
        path: "/n/" + username.value,
    });
}
</script>
