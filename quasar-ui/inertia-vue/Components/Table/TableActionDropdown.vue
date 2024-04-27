<template>
    <div class="relative select-none">
        <!--Trigger-->
        <icon-ellipsis-vertical class="w-6 h-6 cursor-pointer" @click="showPanel = !showPanel"/>
        <transition name="fade">
            <div v-if="showPanel"
                 class="flex justify-between items-center px-2 border dark:border-transparent dark:shadow-dark bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-1 radius-3">
                <!--Show-->
                <div
                    class="hover:bg-red-100 hover:text-red-500 dark:hover:text-gray-200 dark:hover:bg-red-500 dark:hover:bg-opacity-75 cursor-pointer text-sm px-2 radius-3"
                    @click="clickedButton('show')">
                    <div class="flex items-center h-6">
                        <icon-view class="w-5 h-5 hover:text-blue-500"/>
                        Show
                    </div>
                </div>
                <!--Edit-->
                <div
                    class="hover:bg-red-100 hover:text-red-500 dark:hover:text-gray-200 dark:hover:bg-red-500 dark:hover:bg-opacity-75 cursor-pointer text-sm px-2 radius-3"
                    @click="clickedButton('edit')">
                    <div class="flex items-center h-6">
                        <icon-edit class="w-5 h-5 hover:text-yellow-600"/>
                        Edit
                    </div>
                </div>
                <!--Delete-->
                <div
                    class="hover:bg-red-100 hover:text-red-500 dark:hover:text-gray-200 dark:hover:bg-red-500 dark:hover:bg-opacity-75 cursor-pointer text-sm px-2 radius-3"
                    @click="clickedButton('delete')">
                    <div class="flex items-center h-6">
                        <icon-delete class="w-5 h-5 hover:text-red-600"/>
                        Delete
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script setup>
import IconView from "@/Components/Icons/IconView.vue";
import IconEdit from "@/Components/Icons/IconEdit.vue";
import IconDelete from "@/Components/Icons/IconDelete.vue";
import {ref} from "vue";
import IconEllipsisVertical from "@/Components/Icons/IconEllipsisVertical.vue";

const props = defineProps({
    showAction: Object,
    editAction: Object,
    deleteAction: Object
});

const showPanel = ref(0)

function clickedButton(button) {
    this.$emit('action', button)
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: all .4s ease;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.fade-enter-to, .fade-leave {
    opacity: 1;
}
</style>
