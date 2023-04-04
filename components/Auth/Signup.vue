<template>
    <form @submit.prevent class="w-full">
        <Spinner v-if="isLoading"></Spinner>
        <p class="text-center text-red-500 mb-10" v-if="isError">
            {{ errorMessage }}
        </p>
        <div
            class="text-slate-600 dark:text-white p-10 mx-auto w-full"
            v-if="isSuccess"
        >
            <p class="text-2xl text-start mb-10">Thanks for signing up.</p>
            <p>
                Your confirmation email is on its way. In case you don't find it
                in your Inbox
                <b>please check your Promotions or Spam folders.</b>
            </p>
            <p class="mt-4">
                Open the email and
                <b>click on the "Confirm sign up" button</b> to get started on
                our platform.
            </p>
        </div>
        <div class="flex flex-col gap-5" v-else>
            <h2
                class="text-slate-900 dark:text-white text-4xl mb-6 text-center"
            >
                Sign up
            </h2>

            <!-- Email signup -->
            <div class="space-y-2">
                <label
                    class="text-slate-900 text-normal font-bold dark:text-white ml-2"
                >
                    Email
                </label>
                <UIInputText
                    type="email"
                    placeholder="email"
                    v-model="email"
                    required
                    autofocus
                />
            </div>
            <div class="space-y-2">
                <label
                    class="text-slate-900 text-normal font-bold dark:text-white ml-2"
                >
                    Password
                </label>
                <UIInputText
                    placeholder="password"
                    type="password"
                    v-model="password"
                    required
                />
            </div>
            <UIButtonPrimary class="mt-2" @click="signUp"
                >Continue</UIButtonPrimary
            >

            <!-- provider auth -->
            <div
                class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center my-3 pt-5 pb-1 border-t border-slate-400"
            >
                <UIButtonSecondary @click="provider('facebook')">
                    <span><SVGFacebook /></span>
                    <span class="ml-2">Facebook</span>
                </UIButtonSecondary>
                <UIButtonSecondary @click="provider('google')">
                    <span><SVGGoogle /></span>
                    <span class="ml-2">Google</span>
                </UIButtonSecondary>
                <UIButtonSecondary @click="provider('github')">
                    <span><SVGGithub /></span>
                    <span class="ml-2">Github</span>
                </UIButtonSecondary>
            </div>

            <!-- goto login -->
            <div
                class="w-full pt-5 border-t border-slate-400 text-sm text-center"
            >
                <nuxt-link
                    to="/auth/login"
                    class="text-slate-600 dark:text-slate-400"
                >
                    <span> Have an account? Log in instead </span>
                </nuxt-link>
            </div>
        </div>
    </form>
</template>

<script setup>
const email = ref("");
const password = ref("");
const isError = ref(false);
const errorMessage = ref("");
const isSuccess = ref(false);
const isLoading = ref(false);

const client = useSupabaseAuthClient();

//signup using provider
const provider = async (providerName) => {
    console.log("provider", providerName);
    const { user, session, error } = await client.auth.signInWithOAuth({
        provider: providerName,
    });

    if (error) {
        isError.value = true;
        errorMessage.value = error.message;
    }
};

// signup using email
const signUp = async () => {
    // reset error message in case it is already being displayed
    isError.value = false;

    // form validation
    if (!email.value || !password.value) {
        isError.value = true;
        errorMessage.value = "Invalid email or password";
        return;
    }

    try {
        isLoading.value = true;
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
        });
        if (error) {
            isError.value = true;
            errorMessage.value = error.message;
        } else {
            isSuccess.value = true;
        }
    } catch (error) {
        console.log(error);
    }
    isLoading.value = false;
};
</script>
