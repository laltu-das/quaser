<script setup>
import {inject, ref} from "vue";

const setIndex = inject('setIndex');
const index = ref(setIndex());

const setActive = () => {
    console.log("Tab index", index.value, "is active.");
};
</script>

<template>
    <div @click="setActive">
        <slot></slot>
    </div>
</template>

<style scoped>

</style>
