import {computed} from 'vue'

export function useCardsClasses(props) {

    const cardClasses = computed(() => {
        if (props.variant.value === 'default')
            return 'bg-white rounded-lg border border-gray-200 dark:bg-gray-800 shadow'
        else if (props.variant.value === 'image')
            return 'bg-white rounded-lg border border-gray-200 dark:bg-gray-800 shadow'
        else if (props.variant.value === 'horizontal')
            return 'flex flex-col items-center bg-white rounded-lg border md:flex-row md:max-w-xl shadow'
        return ''
    })

    const horizontalImageClasses = computed(() => {
        if (props.variant.value === 'horizontal')
            // return 'object-cover w-full h-fit rounded-t-lg md:h-fit md:w-48 md:rounded-none md:rounded-l-lg'
            return ''
    })

    return {
        cardClasses,
        horizontalImageClasses,
    }
}
