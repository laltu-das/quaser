<script setup>
import {computed, inject} from "vue";

const selectedTab = inject('selectedTab');
const tabs = inject('tabs');
const index = tabs.value.length - 1;

const isVisible = computed(() => index === selectedTab.value);
</script>

<template>
    <div v-if="isVisible">
        <slot></slot>
    </div>
</template>

<style scoped>

</style>
