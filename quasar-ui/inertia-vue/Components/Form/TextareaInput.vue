<script setup>
import {onMounted, ref} from 'vue';

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
});

defineEmits(['update:modelValue']);

const input = ref(null);

defineExpose({focus: () => input.value.focus()});
</script>


<template>
    <textarea
        :value="modelValue"
        class="shadow appearance-none border-gray-300 rounded w-full py-1 px-3 text-gray-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
</template>
