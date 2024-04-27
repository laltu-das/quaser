<script setup>

// Import filepond
import vueFilePond, {setOptions} from 'vue-filepond';

// Import filepond plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';

// Import filepond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import {usePage} from "@inertiajs/vue3";

// Create FilePond component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginImageValidateSize,
    FilePondPluginFileValidateSize,
    FilePondPluginImageExifOrientation,
    FilePondPluginMediaPreview,
    FilePondPluginFilePoster
);

// Set global options on filepond init
const handleFilePondInit = () => {
    setOptions({
        credits: false,
        server: {
            url: '/filepond',
            headers: {
                'X-CSRF-TOKEN': usePage().props.csrf_token,
            }
        }
    });
};

</script>

<template>
    <file-pond
        accepted-file-types="image/*"
        allowImagePreview=true
        class-name="my-pond"
        credits="false"
        @init="handleFilePondInit"
    />
</template>


<style>
.filepond--item {
    width: calc(50% - 0.5em);
}

@media (min-width: 30em) {
    .filepond--item {
        width: calc(50% - 0.5em);
    }
}

@media (min-width: 50em) {
    .filepond--item {
        width: calc(33.33% - 0.5em);
    }
}
</style>
