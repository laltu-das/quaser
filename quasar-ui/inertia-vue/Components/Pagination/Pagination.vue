<script setup>
import {Link} from '@inertiajs/vue3';

defineProps({
    links: Object
})
</script>
<template>
    <div v-if="links.links.length > 3" class="mt-6 flex items-center justify-between">
        <div class="text-gray-500 dark:text-gray-400">
            <p class="font-medium text-gray-700 dark:text-gray-100">
                Page <span>{{ links.current_page }}</span> of <span>{{ links.last_page }}</span>
            </p>
        </div>
        <div class="inline-flex rounded-md shadow-lg">
            <template v-for="(link, p) in links.links" :key="p">
                <div v-if="link.url === null"
                     :class="{ 'bg-blue-700': link.active }"
                     class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                     v-html="link.label"/>
                <Link v-else
                      :class="{ 'bg-blue-700': link.active }"
                      :href="link.url"
                      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      v-html="link.label"/>
            </template>
        </div>
    </div>
</template>
