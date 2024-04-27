<script setup>
import {computed, ref} from 'vue';
import useCarousel from "./useCarousel.js";
import CarouselItem from "./CarouselItem.vue";

const props = defineProps({
    indicators: Boolean,
    controls: Boolean,
    autoplay: Boolean,
    autoplayInterval: Number,
    totalSlides: Number
});

const { currentSlide, nextSlide, previousSlide, totalSlides, slideTo } = useCarousel(props.totalSlides, {
    autoplay: props.autoplay,
    autoplayInterval: props.autoplayInterval
});

const slides = ref([]); // Array to store slide content

const transform = computed(() => `translateX(-${currentSlide.value * 100}%)`);

// Register the slides (we'll do this in the template loop)
function registerSlide(el) {
    slides.value.push(el);
}
</script>

<template>
    <div class="relative overflow-hidden">
        <div class="flex transition-transform duration-700" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <CarouselItem v-for="(slide, index) in slides" :key="index" ref="registerSlide">
                <slot :slide="slide" />
            </CarouselItem>
        </div>

        <div v-if="indicators && totalSlides > 1" class="absolute bottom-5 left-1/2 flex space-x-3 -translate-x-1/2">
            <button v-for="index in totalSlides" :key="index"
                    :aria-current="index === currentSlide ? 'true' : undefined"
                    :aria-label="'Slide ' + (index + 1)"
                    :class="index === currentSlide ? 'bg-white' : 'bg-white/50'"
                    class="w-3 h-3 rounded-full focus:outline-none"
                    role="button"
                    @click.prevent="slideTo(index)">
            </button>
        </div>

        <template v-if="controls">
            <button class="absolute top-1/2 left-0 z-30 -translate-y-1/2 px-4 cursor-pointer focus:outline-none"
                    @click.prevent="previousSlide">
                <span
                    class="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white/50 hover:bg-white/70 focus:ring-4 focus:ring-white/50">
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </span>
            </button>
            <button class="absolute top-1/2 right-0 z-30 -translate-y-1/2 px-4 cursor-pointer focus:outline-none"
                    @click.prevent="nextSlide">
                <span
                    class="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white/50 hover:bg-white/70 focus:ring-4 focus:ring-white/50">
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </span>
            </button>
        </template>
    </div>
</template>
