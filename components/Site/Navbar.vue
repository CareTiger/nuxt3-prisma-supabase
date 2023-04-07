<template>
	<div class="px-8 py-6 flex flex-row items-center justify-between">
		<div>
			<NuxtLink to="/">
				<img
					class="h-12 w-12 rounded-full object-cover"
					src="/favicon.ico"
					alt="avatar"
				/>
			</NuxtLink>
		</div>
		<div class="hidden md:block">
			<ul
				class="flex flex-row space-x-6 border border-slate-100 rounded-full shadow py-2 px-6 text-slate-500 dark:text-white dark:border-slate-600 dark:bg-slate-700 text-sm"
			>
				<li v-if="!user">
					<NuxtLink to="/">Home</NuxtLink>
				</li>
				<li v-if="!user">
					<NuxtLink to="/auth/login">Login</NuxtLink>
				</li>
				<li v-if="!user">
					<NuxtLink to="/auth/signup">Signup</NuxtLink>
				</li>
				<li v-if="user">
					<NuxtLink to="/dashboard">Dashboard</NuxtLink>
				</li>
				<li v-if="user">
					<NuxtLink to="/gallery">Gallery</NuxtLink>
				</li>
				<li v-if="user">
					<NuxtLink to="/notifications">Notifications</NuxtLink>
				</li>
				<li v-if="user">
					<NuxtLink to="/admin">Admin</NuxtLink>
				</li>
				<li v-if="user">
					<NuxtLink to="" @click="logout">Logout</NuxtLink>
				</li>
			</ul>
		</div>
		<!-- Mobile Navbar -->
		<SiteBaseModal :modalActive="modalActive" @close-modal="toggleModal">
			<div class="w-full">
				<div
					class="flex flex-row items-center justify-between py-3 border-b border-slate-300 dark:border-slate-500"
				>
					<h2 class="text-sm uppercase">Navigation</h2>
				</div>
				<ul class="">
					<li
						class="py-3 border-b border-slate-300 dark:border-slate-500"
					>
						<NuxtLink to="/" @click.prevent="toggleModal"
							>Home</NuxtLink
						>
					</li>
					<li
						class="py-3 border-b border-slate-300 dark:border-slate-500"
					>
						<NuxtLink to="/auth/login" @click.prevent="toggleModal"
							>Login</NuxtLink
						>
					</li>
					<li class="pt-3 pb-4">
						<NuxtLink to="/auth/signup" @click.prevent="toggleModal"
							>Signup</NuxtLink
						>
					</li>
				</ul>
			</div>
		</SiteBaseModal>
		<div class="flex items-center space-x-2">
			<div
				class="md:hidden flex flex-row items-center border border-slate-100 dark:border-slate-600 rounded-full shadow py-2 px-6 cursor-pointer"
				@click="toggleModal"
			>
				<span class="text-slate-500 dark:text-white text-sm">Menu</span>
				<span class="material-icons-round text-sm dark:text-white">
					expand_more
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
const modalActive = ref(false);
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const toggleModal = () => {
	modalActive.value = !modalActive.value;
};

function logout() {
	client.auth.signOut();
	navigateTo("/");
}
</script>
