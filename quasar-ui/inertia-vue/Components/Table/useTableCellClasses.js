import {computed, inject} from 'vue'
import classNames from 'classnames'

const baseClasses = 'px-4 text-sm font-medium whitespace-nowrap'
const stripedCellClasses = 'even:bg-gray-white even:dark:bg-gray-900 odd:dark:bg-gray-800 odd:bg-gray-50'

export function useTableCellClasses() {
    const isColumnsStriped = inject('stripedColumns')

    const tableCellClasses = computed(() => {
        return classNames(baseClasses, {
            [stripedCellClasses]: isColumnsStriped,
        })
    })

    return {
        tableCellClasses,
    }
}
