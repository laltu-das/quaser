<script setup>
import {inject} from 'vue';

defineProps({
    props: {
        title: String,
    }
})

const selectedTab = inject('selectedTab');
const tabs = inject('tabs');

const selectTab = () => {
    const index = tabs.value.indexOf(props.title);
    if (index !== -1) {
        selectedTab.value = index;
    }
};

tabs.value.push(props.title);
</script>

<template>
    <button @click="selectTab">{{ title }}</button>
</template>
