<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    options: {
        type: Object,
        require: true,
    },
    modelValue: {
        type: [String, Number],
    },
})


defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({focus: () => input.value.focus()});

</script>

<template>
    <select
        ref="input"
        :value="modelValue"
        class="leading-tight shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <option disabled value="">{{label ? label : 'Please select'}}</option>
        <option v-for="(value, key, index) in options" :key="index" :value="key">
            {{ value }}
        </option>
    </select>
</template>
