<script setup>
import {useVModel} from '@vueuse/core'

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    size: {
        type: String,
        default: 'md',
    },
    modelValue: {
        type: String,
        default: '',
    },
})

const model = useVModel(props, 'modelValue')

</script>

<template>
    <div>
        <label v-if="label" class="block tracking-wide text-gray-700 text-sm font-bold mb-2">
            {{ label }}
        </label>
        <div class="flex relative">
            <div v-if="$slots.prefix"
                 class="w-10 flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none overflow-hidden">
                <slot name="prefix"/>
            </div>
            <input
                :disabled="disabled"
                class="shadow appearance-none border border-gray-300 rounded w-full py-0.5 px-3 text-gray-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="file"
                v-bind="$attrs"
                v-on:change="model"
            />
            <div v-if="$slots.suffix" class="absolute right-2.5 bottom-2.5">
                <slot name="suffix"/>
            </div>
        </div>
        <p v-if="$slots.helper" class="text-red-500 text-xs italic">
            <slot name="helper"/>
        </p>
    </div>
</template>
