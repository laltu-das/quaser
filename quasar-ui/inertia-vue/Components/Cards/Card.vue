<script setup>
import {computed, toRefs} from 'vue'
import {useCardsClasses} from "./useCardClasses.js";

const props = defineProps({
    href: {
        type: String,
        default: '',
    },
    imgAlt: {
        type: String,
        default: '',
    },
    imgSrc: {
        type: String,
        default: '',
    },
    variant: {
        type: String,
        default: 'default',
    },
})
const {cardClasses, horizontalImageClasses} = useCardsClasses(toRefs(props))
const wrapperType = computed(() => props.href ? 'a' : 'div')
</script>

<template>
    <component :is="wrapperType" :class="cardClasses" :href="href">
        <img v-if="imgSrc" :alt="imgAlt" :class="horizontalImageClasses" :src="imgSrc"
             class="rounded-t-lg object-cover w-full h-fit md:h-fit md:w-48 md:rounded-none md:rounded-l-lg"/>
        <div class="p-6">
            <slot/>
        </div>
    </component>
</template>
