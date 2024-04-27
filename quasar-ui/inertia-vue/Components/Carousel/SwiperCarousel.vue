<script setup>
import {ref, useAttrs} from 'vue';
import {Swiper, SwiperSlide} from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const attrs = useAttrs();
const swiper = ref(null);
</script>

<template>
    <swiper ref="swiper" v-bind="attrs">
        <slot></slot>
    </swiper>
</template>
