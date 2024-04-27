<script setup>
import {useTableCellClasses} from './useTableCellClasses.js'

const {tableCellClasses} = useTableCellClasses()
</script>

<template>
    <td :class="tableCellClasses">
        <slot></slot>
    </td>
</template>
