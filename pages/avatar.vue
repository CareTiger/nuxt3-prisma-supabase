<template>
    <div>
        <h1 class="text-2xl text-center">Avatar</h1>
        <div>
            <h2 class="text-lg">Upload your image</h2>
            <img
                :src="imageURL"
                width="200"
                height="200"
                alt="your image"
                v-if="imageURL"
            />
            <div>
                <input
                    type="file"
                    id="file"
                    v-on:change="onFileChanged($event)"
                    accept="image/*"
                    capture
                />

                <UIButtonSecondary
                    class="mt-4 max-w-xs"
                    v-on:click="submitForm()"
                    >Upload</UIButtonSecondary
                >
            </div>
        </div>
        <div>
            <h2 class="text-lg">Your images</h2>
            <div v-for="image in imageGallery" :key="image">
                <img :src="image" width="200" height="200" alt="your image" />
            </div>
        </div>
    </div>
</template>
<script setup>
// https://stackoverflow.com/questions/65703814/how-to-upload-file-in-vue-js-version-3
// https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded

const user = useSupabaseUser();
const client = useSupabaseClient();
const avatarFile = ref(null);
const imageURL = ref(null);
const imageGallery = ref([]);

definePageMeta({
    middleware: ["auth"],
});

function onFileChanged(event) {
    imageURL.value = URL.createObjectURL(event.target.files[0]);
    // show selected image
    avatarFile.value = event.target.files[0];
}

async function submitForm() {
    try {
        const { data, error } = await client.storage
            .from("sampyl/users/" + user.value.id)
            .upload(avatarFile.value.name, avatarFile.value, {
                cacheControl: "3600",
                upsert: false,
            });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
</script>
