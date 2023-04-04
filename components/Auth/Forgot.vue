<template>
    <form class="w-full" @submit.prevent>
        <Spinner v-if="isLoading"></Spinner>
        <p class="text-center text-red-500 mb-10" v-if="isError">
            {{ errorMessage }}
        </p>

        <div v-if="isSuccess">
            {{ successMessage }}
        </div>
        <div class="flex flex-col space-y-5" v-else>
            <h2
                class="text-slate-900 dark:text-white text-4xl mb-6 text-center"
            >
                Forgot Password
            </h2>
            <UIInputText
                :type="email"
                class="my-input"
                placeholder="Email"
                v-model="email"
                autofocus
            />
            <UIButtonPrimary @click="forgot">Send me a link</UIButtonPrimary>
            <!-- goto login -->
            <div
                class="w-full pt-5 border-t border-slate-400 text-sm text-center"
            >
                <nuxt-link to="/auth/login" class="text-slate-500">
                    <span> Go back to Log in</span>
                </nuxt-link>
            </div>
        </div>
    </form>
</template>

<script setup>
const client = useSupabaseAuthClient();
const email = ref("");
const isError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const isSuccess = ref(false);
const successMessage = ref("");

const forgot = async () => {
    //reset the error status
    isError.value = false;

    // form validation
    if (!email.value) {
        isError.value = true;
        errorMessage.value = "Please enter a valid email";
        return;
    }
    isLoading.value = true;
    try {
        const { data, error } = await client.auth.resetPasswordForEmail(
            email.value
            // {
            //     redirectTo: "http://localhost:3000/auth/reset",
            // }
        );
        if (error) {
            isError.value = true;
            errorMessage.value = error.message;
        } else {
            isSuccess.value = true;
            successMessage.value = "Your password reset link has been sent!";
        }
    } catch (error) {
        isError.value = true;
        errorMessage.value = error.message;
    }

    isLoading.value = false;
};
</script>
