<template><div>todos</div></template>
<script setup>
const client = useSupabaseClient();
const todos = await client.from("todos").select("*");
console.log(todos.status);
</script>
