<template>
	<div>
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
					class="flex flex-row justify-between items-center p-2 border-b border-gray-300"
					v-for="todo in userStore.profile.todos"
					:key="todo.id"
				>
					<span>{{ todo.title }}</span>
					<span
						><UIToggle
							:model-value="todo.completed"
							@update="markAsCompleted(todo.id)"
						></UIToggle
					></span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
// check if RLS is enabled
// const client = useSupabaseClient();
// const { data: todos, error } = await client.from("todos").select("*");
// console.log(todos);

const todo = ref("");
function addTodo() {
	console.log(todo.value);
	// const { data: todos, error } = await client.from("todos").select("*");
	// console.log(todos);
	todo.value = "";
}

function markAsCompleted(id) {
	console.log(id);
}
</script>
