<template>
	<form @submit.prevent class="w-full">
		<Spinner v-if="isLoading"></Spinner>
		<p
			class="text-center text-sm lg:text-base text-red-500 mb-10"
			v-if="isError"
		>
			{{ errorMessage }}
		</p>
		<div class="flex flex-col gap-5">
			<h2
				class="text-slate-900 dark:text-white text-4xl mb-6 text-center"
			>
				Login
			</h2>
			<!--Email/pwd-->
			<div class="flex flex-col gap-2">
				<label
					for="email"
					class="text-slate-900 dark:text-white text-normal font-bold ml-2"
					>Email</label
				>
				<UIInputText
					v-model="myEmail"
					type="email"
					id="email"
					placeholder="email"
					required
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label
					for="password"
					class="text-slate-900 dark:text-white text-normal font-bold ml-2"
					>Password</label
				>
				<UIInputText
					v-model="myPassword"
					type="password"
					id="password"
					placeholder="password"
					required
				/>
			</div>

			<UIButtonPrimary class="mt-2" @click="login">
				Log in
			</UIButtonPrimary>

			<!--provide auth-->
			<div
				class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center my-3 pt-5 pb-1 border-t border-slate-400"
			>
				<UIButtonSecondary
					class="col-span-1"
					@click="provider('facebook')"
				>
					<span><SVGFacebook /></span>
					<span class="ml-2">Facebook</span>
				</UIButtonSecondary>
				<UIButtonSecondary
					class="col-span-1"
					@click="provider('google')"
				>
					<span><SVGGoogle /></span>
					<span class="ml-2">Google</span>
				</UIButtonSecondary>
				<UIButtonSecondary
					class="col-span-1"
					@click="provider('github')"
				>
					<span><SVGGithub /></span>
					<span class="ml-2">Github</span>
				</UIButtonSecondary>
			</div>

			<!--Forgot-->
			<nuxt-link
				to="/auth/forgot"
				class="text-sm text-center text-slate-600 dark:text-slate-400 hover:text-green-500"
			>
				<span> Forgot your password? </span>
			</nuxt-link>

			<!--navigate to signup -->
			<div class="pt-5 border-t border-slate-300 text-sm text-center">
				<nuxt-link
					to="/auth/signup"
					class="text-slate-600 dark:text-slate-400 hover:text-green-500"
				>
					<span>Not on our platform? Sign up</span>
				</nuxt-link>
			</div>
		</div>
	</form>
</template>

<script setup>
const myEmail = ref("");
const myPassword = ref("");
const isError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const user = useSupabaseUser();
const client = useSupabaseAuthClient();

//login using provider
const provider = async (providerName) => {
	const { data, error } = await client.auth.signInWithOAuth({
		provider: providerName,
		// options: {
		// 	redirectTo: "http://localhost:3000/dashboard",
		// },
	});

	if (error) {
		isError.value = true;
		errorMessage.value = error.message;
	}
};

// login using email and password
const login = async () => {
	// form validation
	if (!myEmail.value || !myPassword.value) {
		isError.value = true;
		errorMessage.value = "Invalid email or password";
		return;
	}

	isLoading.value = true;
	try {
		const { data, error } = await client.auth.signInWithPassword({
			email: myEmail.value,
			password: myPassword.value,
		});

		if (error) {
			isError.value = true;
			errorMessage.value = error.message;
		} else {
			// hack for demo
			// setTimeout(() => {
			//     isLoading.value = false;
			//     router.push("/dashboard");
			// }, 1000);
		}
	} catch (error) {
		isLoading.value = false;
		console.log(error);
	}
};

watchEffect(() => {
	if (user.value) {
		isLoading.value = false;
		navigateTo("/dashboard");
	}
});
</script>
