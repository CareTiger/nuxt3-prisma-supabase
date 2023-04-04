<template>
    <div>
        <label
            for=""
            v-if="props.label"
            class="block pl-3 ml-px text-sm font-medium text-gray-700 dark:text-gray-200"
            >{{ props.label }}</label
        >
        <input
            :type="props.type"
            class="w-full rounded-3xl py-2 px-4 lg:py-3 lg:px-5 border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black dark:bg-slate-200"
            :placeholder="props.placeholder"
            :value="props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>
<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "text",
    },
    placeholder: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: null,
    },
});
// defines what events our component emits
defineEmits(["update:modelValue"]);
</script>
