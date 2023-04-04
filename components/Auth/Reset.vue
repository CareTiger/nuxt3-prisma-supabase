<template>
    <form class="w-full" @submit.prevent="reset()">
        <Spinner v-if="isLoading"></Spinner>
        <p class="text-center text-red-500 mb-10" v-if="isError">
            {{ errorMessage }}
        </p>
        <div class="flex flex-col gap-5">
            <h2
                class="text-slate-900 dark:text-white text-4xl mb-6 text-center"
            >
                Reset Password
            </h2>
            <div class="space-y-2">
                <label
                    for="password"
                    class="block text-slate-900 dark:text-white text-sm font-bold ml-2"
                >
                    Password
                </label>
                <UIInputText :type="password" v-model="password" autofocus />
            </div>
            <div class="space-y-2">
                <label
                    for="password"
                    class="block text-slate-900 dark:text-white text-sm font-bold ml-2"
                >
                    Re-enter Password
                </label>
                <UIInputText :type="password" v-model="password2" />
            </div>
            <UIButtonPrimary @click="reset">Reset</UIButtonPrimary>
        </div>
    </form>
</template>

<script setup>
const password = ref("");
const password2 = ref("");
let passwordsMatch = false;
const client = useSupabaseAuthClient();
const isError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

function reset() {
    if (!password.value || !password2.value) {
        isError.value = true;
        errorMessage.value = "Please enter a valid password.";
        return;
    }

    if (password.value === password2.value) {
        passwordsMatch = true;
    } else {
        isError.value = true;
        errorMessage.value = "Passwords don't match.";
    }

    if (passwordsMatch) {
        resetAPI();
    }
}

const resetAPI = async () => {
    isLoading.value = true;

    const { data, error } = await client.auth.updateUser({
        password: password.value,
    });

    if (data) {
        navigateTo("/");
    } else {
        isError.value = true;
        errorMessage.value = error.message;
    }

    isLoading.value = false;
};
</script>
