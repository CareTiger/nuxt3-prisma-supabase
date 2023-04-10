<template>
	<div>
		<Spinner v-if="isLoading" />
		<h1 class="text-center text-4xl">Todos</h1>
		<div class="mt-8 grid place-items-center max-w-md mx-auto">
			<div class="w-full">
				<label for="email" class="sr-only">Email</label>
				<input
					v-model="todo"
					type="text"
					class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
					placeholder="Enter your todo and press enter"
					v-on:keyup.enter="addTodo"
				/>
			</div>
			<ul class="mt-8 w-full">
				<li
					class="flex flex-row justify-between items-center p-2 mb-2 rounded-lg bg-slate-500"
					v-for="todo in userStore.profile.todos"
					:key="todo.id"
				>
					<div>{{ todo.title }}</div>
					<div class="flex flex-row justify-center items-center">
						<span
							><UIToggle
								:model-value="todo.completed"
								@update="completedTodo(todo.id)"
							></UIToggle
						></span>
						<span
							class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center ml-2"
							@click="deleteTodo(todo.id)"
							>X</span
						>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const isLoading = ref(false);
// check if RLS is enabled
// const client = useSupabaseClient();
// const { data: todos, error } = await client.from("todos").select("*");
// console.log(todos);

const todo = ref("");
async function addTodo() {
	setTimeout(() => {
		isLoading.value = true;
	}, 500);
	const { data, error } = await useFetch("/api/v1/todos/createTodo", {
		method: "POST",
		body: {
			auth_id: userStore.profile.id,
			title: todo.value,
		},
	});
	const { data2, error2 } = await useGetUser();
	isLoading.value = false;
	todo.value = "";
}

async function completedTodo(id) {
	setTimeout(() => {
		isLoading.value = true;
	}, 500);
	const { data, error } = await useFetch("/api/v1/todos/updateTodo", {
		method: "PUT",
		body: {
			id,
			completed: true,
		},
	});
	useGetUser();
	isLoading.value = false;
}

async function deleteTodo(id) {
	setTimeout(() => {
		isLoading.value = true;
	}, 500);
	const { data, error } = await useFetch("/api/v1/todos/deleteTodo", {
		method: "DELETE",
		body: {
			id,
		},
	});
	useGetUser();
	isLoading.value = false;
}
</script>
