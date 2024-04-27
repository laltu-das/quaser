<script setup>
import {useAccordionContentClasses} from './useAccordionContentClasses.js'
import {onMounted, ref} from 'vue'

const isLoaded = ref(false)
const content = ref()
let contentClasses

onMounted(() => {
    const accordionHeaderClasses = useAccordionContentClasses(content)
    contentClasses = accordionHeaderClasses.contentClasses
    isLoaded.value = true
})

</script>

<template>
    <div ref="content">
        <div
            v-if="isLoaded"
            :class="contentClasses"
        >
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>
