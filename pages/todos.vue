<template><div>todos</div></template>
<script setup>
const client = useSupabaseClient();
const { data: todos, error } = await client.from("todos").select("*");
console.log(todos);
</script>
