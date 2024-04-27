<script setup>
import {useTableRowClasses} from './useTableRowClasses.js'

const {tableRowClasses} = useTableRowClasses()
</script>

<template>
    <tr :class="tableRowClasses">
        <slot></slot>
    </tr>
</template>
