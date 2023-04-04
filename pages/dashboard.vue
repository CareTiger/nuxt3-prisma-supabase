<template>
    <div class="w-full">
        <h1 class="text-center text-4xl">Dashboard</h1>
    </div>
</template>
<script setup>
definePageMeta({
    middleware: ["auth"],
});
</script>
