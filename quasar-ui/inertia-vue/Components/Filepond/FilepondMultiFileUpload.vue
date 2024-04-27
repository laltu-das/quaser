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
import {onMounted, reactive} from "vue";

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
            fetch: '/filepond',
            headers: {
                'X-CSRF-TOKEN': usePage().props.csrf_token,
            }
        }
    })
};


// Data
const filesFromApi = reactive([
    {
        id: "1",
        name: "test1.jpg",
        url: "https://id.m.wikipedia.org/wiki/Berkas:Cat03.jpg",
        size: 20000,
    },
    {
        id: "2",
        name: "test2.jpg",
        url:
            "https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg",
        size: 30000,
    },
]);
const myFiles = reactive([]);
const myServer = reactive({
    process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        if (file.lastModified) {
            /* this is used for upload file */
            /* axios(config)
                    .then(response => { ... */
        } else {
            /* this is used for edit form / show files uploaded */
            /* get metadata & save in vuex store */
            /*this.saveUploadFile({
                    id: metadata.id,
                    name metadata.name,
                    url: metadata.url,
                    size: metadata.size
                   })*/
            console.log(metadata);
            load(metadata.id);
        }
    },
});

// Mounted
onMounted(() => {
    for (let key in filesFromApi) {
        let fileData = {
            source: filesFromApi[key].name,
            options: {
                // type: "local",
                // file: {
                //   name: filesFromApi[key].name,
                //   size: filesFromApi[key].size,
                // },
                metadata: {
                    id: filesFromApi[key].id,
                    name: filesFromApi[key].name,
                    url: filesFromApi[key].url,
                    size: filesFromApi[key].size,
                },
            },
        };
        myFiles.push(fileData);
    }
})

</script>

<template>
    <file-pond
        :files="myFiles"
        :server="myServer"
        accepted-file-types="image/*"
        allowImagePreview=true
        class-name="my-pond"
        @init="handleFilePondInit"
    />
</template>


<style>
.filepond--drop-label {
    @apply shadow appearance-none w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-300 rounded;
}

.filepond--credits {
    @apply hidden;
}

.filepond--root {
    @apply mb-0;
}
</style>
