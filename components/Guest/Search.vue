<template>
    <div class="flex flex-col my-content-height w-4/5 lg:w-1/2 mx-auto mt-10">
        <h2 class="text-2xl lg:text-4xl py-2 mb-6 border-b border-slate-600">
            Search
        </h2>
        <div class="grow">
            <form class="mb-6" action="submit" @submit.prevent="">
                <div>
                    <div class="text-red-500" v-if="isError">
                        {{ errorMessage }}
                    </div>
                    <div class="mt-1">
                        <UIInputText
                            @keyup.enter="search"
                            v-model="searchString"
                        />
                    </div>
                    <UIButtonPrimary class="mt-4" @click="search"
                        >Search</UIButtonPrimary
                    >
                </div>
            </form>
            <Spinner v-if="isLoading" />
            <section>
                <div v-if="notes">
                    <div class="" v-for="note in notes" :key="note.id">
                        <CardsSearch :note="note" />
                    </div>
                </div>
                <div v-else>
                    <p>No results.</p>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
const { getSearchAPI } = useGuestAPI();
const { formatDate } = useUtils();
const isLoading = ref(false);
const searchString = ref("");
const isError = ref(false);
const errorMessage = ref("");
let notes = ref([]);

const search = async () => {
    isLoading.value = true;
    try {
        notes.value = await getSearchAPI(searchString.value);
        console.log(notes.value);
        isLoading.value = false;
    } catch (error) {
        isLoading.value = false;
        isError.value = true;
        errorMessage.value = error.errorMessage;
    }
};
</script>
