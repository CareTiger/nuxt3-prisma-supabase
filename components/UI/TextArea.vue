<template>
    <div>
        <textarea
            :rows="rows"
            :name="name"
            :id="id"
            class="mt-2 py-2 px-4 lg:py-3 lg:px-5 block w-full rounded-3xl resize-none focus:ring-0 sm:text-sm dark:text-slate-800 border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-slate-200"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
    </div>
</template>
<script setup>
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    rows: {
        type: Number,
        required: true,
    },
    placeholder: {
        type: String,
    },
});
// defines what events our component emits
defineEmits(["update:modelValue"]);
</script>
