<script setup>
import {computed, useAttrs} from 'vue';
import {twMerge} from "tailwind-merge";

// Reactive object of all non-prop attributes
const attrs = useAttrs();

// Default component classes
const defaultClasses = 'inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150';

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
