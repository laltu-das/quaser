import {computed} from 'vue'
import {simplifyTailwindClasses} from '@/utils/simplifyTailwindClasses'

// LABEL
const defaultLabelClasses = 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'

// INPUT
const defaultInputClasses = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

const disabledInputClasses = 'cursor-not-allowed bg-gray-100'

const inputSizeClasses = {
    lg: 'p-4',
    md: 'p-2.5 text-sm',
    sm: 'p-2 text-sm',
}


export function useInputClasses(props) {
    const inputClasses = computed(() => {
        return simplifyTailwindClasses(defaultInputClasses, inputSizeClasses[props.size.value], props.disabled.value ? disabledInputClasses : '')
    })

    const labelClasses = computed(() => {
        return defaultLabelClasses
    })

    return {
        inputClasses,
        labelClasses,
    }
}