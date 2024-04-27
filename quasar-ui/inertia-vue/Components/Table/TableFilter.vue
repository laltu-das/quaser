<template>
    <Dropdown
        :active="hasEnabledFilters"
        dusk="filters-dropdown"
        placement="bottom-end"
    >
        <template #button>
            <svg
                :class="{
          'text-gray-400': !hasEnabledFilters,
          'text-green-400': hasEnabledFilters,
        }"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    clip-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    fill-rule="evenodd"
                />
            </svg>
        </template>

        <div
            aria-labelledby="filter-menu"
            aria-orientation="horizontal"
            class="min-w-max"
            role="menu"
        >
            <div
                v-for="(filter, key) in filters"
                :key="key"
            >
                <h3 class="text-xs uppercase tracking-wide bg-gray-100 p-3">
                    {{ filter.label }}
                </h3>
                <div class="p-2">
                    <select
                        v-if="filter.type === 'select'"
                        :name="filter.key"
                        :value="filter.value"
                        class="block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm text-sm border-gray-300 rounded-md"
                        @change="onFilterChange(filter.key, $event.target.value)"
                    >
                        <option
                            v-for="(option, optionKey) in filter.options"
                            :key="optionKey"
                            :value="optionKey"
                        >
                            {{ option }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </Dropdown>
</template>

<script setup>
import Dropdown from "@/Components/Dropdown.vue";

defineProps({
    hasEnabledFilters: {
        type: Boolean,
        required: true,
    },
    filters: {
        type: Object,
        required: true,
    },
    onFilterChange: {
        type: Function,
        required: true,
    },
});
</script>
