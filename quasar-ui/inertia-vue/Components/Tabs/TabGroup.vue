<script setup>
import {ref, provide, defineComponent} from 'vue';
import TabList from './TabList.vue';
import TabPanels from './TabPanels.vue';

export default defineComponent({
    name: 'TabGroup',
    components: {TabList, TabPanels},
    setup(props, {slots}) {
        const selectedTab = ref(0);
        const tabs = ref([]);

        provide('tabs', tabs);
        provide('selectedTab', selectedTab);

        return {selectedTab, tabs, slots};
    },
});
</script>

<template>
    <div>
        <TabList v-model:selectedTab="selectedTab" :tabs="tabs">
            <slot name="tablist"></slot>
        </TabList>
        <TabPanels :selectedTab="selectedTab">
            <slot name="tabpanels"></slot>
        </TabPanels>
    </div>
</template>
