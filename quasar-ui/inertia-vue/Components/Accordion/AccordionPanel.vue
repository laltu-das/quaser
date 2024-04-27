<script setup>
import {computed, onMounted, ref} from 'vue'
import {useAccordionState} from './useAccordionState.js'
import {nanoid} from 'nanoid'

const {accordionsStates} = useAccordionState()


const panelId = nanoid()
const panel = ref()
const accordionId = computed(() => {
    if (panel.value) return panel.value.parentElement.dataset.accordionId
    return null
})

const accordionState = computed(() => {
    return accordionsStates[accordionId.value]
})

onMounted(() => {
    const panelsCount = Object.keys(accordionState?.value?.panels)?.length
    accordionState.value.panels[panelId] = {
        id: panelId,
        order: panelsCount,
        isVisible: !panelsCount,
    }
})
</script>

<template>
    <div ref="panel" :data-panel-id="panelId">
        <slot v-if="accordionId"></slot>
    </div>
</template>

<style scoped>

</style>
