<script setup>
import {computed, onMounted, ref, useAttrs} from 'vue';

const props = defineProps({
    suggestions: {
        type: [Array, Promise],
        require: true,
    }
});

const emit = defineEmits(['update:modelValue']);

const search = ref('');
const filteredSuggestions = ref([]);
const highlightedIndex = ref(0);

// Function to process suggestions
const processSuggestions = async (suggestions) => {
    if (suggestions instanceof Promise) {
        return suggestions.then(data => data);
    }
    return suggestions;
};

// Function to handle input and filter suggestions
const handleInput = async () => {
    const suggestionsData = await processSuggestions(props.suggestions);
    if (search.value) {
        filteredSuggestions.value = suggestionsData.filter(suggestion =>
            suggestion?.label?.toString().toLowerCase().includes(search.value.toLowerCase())
        );
    } else {
        filteredSuggestions.value = [];
    }
    highlightedIndex.value = 0;
};


// Highlight the next suggestion
const highlightNext = () => {
    if (highlightedIndex.value < filteredSuggestions.value.length - 1) {
        highlightedIndex.value++;
    }
};

// Highlight the previous suggestion
const highlightPrevious = () => {
    if (highlightedIndex.value > 0) {
        highlightedIndex.value--;
    }
};

// Select the highlighted suggestion
const selectHighlighted = () => {
    if (filteredSuggestions.value.length > 0) {
        selectSuggestion(filteredSuggestions.value[highlightedIndex.value]);
    }
};

// Select a suggestion and update search input
const selectSuggestion = (suggestion) => {
    search.value = suggestion.label;
    filteredSuggestions.value = [];
    emit('update:modelValue', suggestion.value);
};

onMounted(async () => {
    filteredSuggestions.value = await processSuggestions(props.suggestions);
});

import {twMerge} from "tailwind-merge";

// Reactive object of all non-prop attributes
const attrs = useAttrs();

// Default component classes
const defaultClasses = 'shadow appearance-none w-full py-1.5 text-gray-700 bg-white border border-gray-300 rounded placeholder-gray-400/70 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40';

// Computed property to merge default classes with $attrs.class using twMerge
const mergedClasses = computed(() => {
    return twMerge(defaultClasses, attrs.class);
});

</script>
<template>
    <div class="relative">
        <input
            v-model="search"
            :class="mergedClasses"
            class="shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
            placeholder="Type to search..."
            type="text"
            @input="handleInput"
            @keydown.down.prevent="highlightNext"
            @keydown.up.prevent="highlightPrevious"
            @keydown.enter.prevent="selectHighlighted"
        />

        <ul v-if="filteredSuggestions.length > 0"
            class="absolute w-full mt-1 bg-white shadow-lg max-h-60 overflow-auto rounded-md z-10">
            <li
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                :class="{'bg-blue-100': index === highlightedIndex}"
                class="px-4 py-2 cursor-pointer hover:bg-blue-100"
                @click="selectSuggestion(suggestion)"
            >
                {{ suggestion.label }}
            </li>
        </ul>
    </div>
</template>
