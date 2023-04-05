<template>
    <div>
        <div
            class="flex flex-col mx-auto border border-slate-300 p-6 rounded-xl"
        >
            <h2 class="text-lg text-center">Upload your image</h2>
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
        <div class="mt-8 border border-slate-300 p-6 rounded-xl">
            <p v-if="imageGallery.length === 0" class="">
                No images in your gallery.
            </p>
            <ul
                v-else
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
            >
                <li
                    class="col-span-1"
                    v-for="image in imageGallery"
                    :key="image.name"
                >
                    <img
                        class="w-full h-96 object-cover rounded-2xl"
                        :src="`${runtimeConfig.SUPABASE_STORAGE_BASE_URL}/sampyl/users/${user.id}/${image.name}`"
                        alt="your image"
                    />
                </li>
            </ul>
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
const runtimeConfig = useRuntimeConfig();
const timeStamp = Date.now();

getImages();

definePageMeta({
    middleware: ["auth"],
});

function onFileChanged(event) {
    imageURL.value = URL.createObjectURL(event.target.files[0]);
    // show selected image to the user
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
        getImages();
    } catch (error) {
        console.log(error);
    }
}

async function getImages() {
    try {
        const { data, error } = await client.storage
            .from("sampyl")
            .list("users/" + user.value.id, {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" },
            });
        imageGallery.value = data;
    } catch (error) {
        console.log(error);
    }
}
</script>
