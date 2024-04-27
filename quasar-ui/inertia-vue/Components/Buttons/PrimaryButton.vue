<script setup>
import {computed, useAttrs} from 'vue';
import {twMerge} from "tailwind-merge";

// Reactive object of all non-prop attributes
const attrs = useAttrs();

// Default component classes
const defaultClasses = 'px-4 py-2 flex-none bg-gray-800 dark:bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-950 focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150';

// Computed property to merge default classes with $attrs.class using twMerge
const mergedClasses = computed(() => {
    return twMerge(defaultClasses, attrs.class);
});
</script>

<template>
    <button
        :class="mergedClasses"
        v-bind="attrs"
    >
        <slot></slot>
    </button>
</template>
