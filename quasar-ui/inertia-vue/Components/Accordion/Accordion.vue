<script setup>
import {nanoid} from 'nanoid'
import {useAccordionState} from './useAccordionState.js'

const props = defineProps({
    alwaysOpen: {
        type: Boolean,
        default: false,
    },
    flush: {
        type: Boolean,
        default: false,
    },
})

const accordionId = nanoid()
useAccordionState(accordionId, {...props})
</script>

<template>
    <div :data-accordion-id="accordionId" class="vp-raw">
        <slot/>
    </div>
</template>
