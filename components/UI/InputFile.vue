<template>
    <div>
        <div class="bg-white">
            <img
                class="bg-white rounded-2xl border w-full"
                :src="inputImageUrl"
                v-if="inputImageUrl"
                alt="your file"
            />
        </div>

        <div
            class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2"
        >
            <input
                type="file"
                class="hidden"
                ref="imageInput"
                accept="image/png, image/gif, image/jpeg"
                @change="handleImageChange"
            />
            <div class="flex items-center space-x-5">
                <button
                    type="button"
                    class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                    @click="attachFile"
                >
                    <i class="fa-sharp fa-solid fa-paperclip"></i>
                    <span class="sr-only">Attach a file</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const selectedFile = ref(null);
const inputImageUrl = ref(null);
// emitter
const emits = defineEmits(["onSubmit"]);
//image component
const imageInput = ref();

const attachFile = () => {
    imageInput.value.click();
};

function handleImageChange(event) {
    const file = event.target.files[0];
    selectedFile.value = file;
    const reader = new FileReader();

    reader.onload = (event) => {
        inputImageUrl.value = event.target.result;
    };
    reader.readAsDataURL(file);
}
</script>
