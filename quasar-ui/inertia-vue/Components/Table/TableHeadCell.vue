<script setup>
import {useTableHeadCellClasses} from './useTableHeadCellClasses.js'

const {tableHeadCellClasses} = useTableHeadCellClasses()
</script>
<template>
    <th :class="tableHeadCellClasses" scope="col">
        <slot></slot>
    </th>
</template>
