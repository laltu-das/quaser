<script setup>
import {computed, ref, useAttrs} from 'vue';

import {twMerge} from "tailwind-merge";

defineProps({
    modelValue: {
        type: String,
    },
});

// Reactive object of all non-prop attributes
const attrs = useAttrs();

// Default component classes
const defaultClasses = 'shadow appearance-none w-full py-1.5 text-gray-700 bg-white border border-gray-300 rounded placeholder-gray-400/70 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40';

// Computed property to merge default classes with $attrs.class using twMerge
const mergedClasses = computed(() => {
    return twMerge(defaultClasses, attrs.class);
});

defineEmits(['update:modelValue']);

const input = ref(null);

defineExpose({focus: () => input.value.focus()});
</script>

<template>
    <input
        ref="input"
        :class="mergedClasses"
        :value="modelValue"
        v-bind="attrs"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
