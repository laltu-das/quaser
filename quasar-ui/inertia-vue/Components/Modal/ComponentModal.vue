<script>
import Axios from "axios";

import {ref, onBeforeMount} from 'vue';
import {hrefToUrl, mergeDataIntoQueryString, urlWithoutHash} from "@inertiajs/core";


// Data
const modal = ref('null');

// Methods
const close = function () {
    if (modal.value) {
        // remove the 'X-Inertia-Modal' and 'X-Inertia-Modal-Redirect-Back' headers for future requests
        modal.value.removeBeforeEventListener();
    }

    modal.value = null;
}

const visitInModal = function (url, onSuccess) {
    let data = {};

    [url, data] = mergeDataIntoQueryString("get", hrefToUrl(url), {});

    Axios({
        method: "get",
        url: urlWithoutHash(url).href,
        data: {},
        params: data,
        headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Requested-With": "XMLHttpRequest",
            "X-Inertia": true,
            "X-Inertia-Modal": true,
            "X-Inertia-Version": this.$page.version,
        },
    }).then((response) => {
        const Inertia = this.$inertia;
        const page = response.data;

        return Promise.resolve(Inertia.resolveComponent(page.component)).then(
            (component) => {
                const clone = JSON.parse(JSON.stringify(page));
                clone.props = Inertia.transformProps(clone.props);

                const removeBeforeEventListener = Inertia.on("before", (event) => {
                    // make sure the backend knows we're requesting from within a modal
                    event.detail.visit.headers["X-Inertia-Modal"] = true;

                    if (onSuccess) {
                        event.detail.visit.headers[
                            "X-Inertia-Modal-Redirect-Back"
                            ] = true;
                    }
                });

                modal.value = {
                    component,
                    onSuccess,
                    removeBeforeEventListener,
                    page: clone,
                };
            }
        );
    });
}


// BeforeMount
onBeforeMount(() => {
    this.$inertia.visitInModal = (url, onSuccess) => {
        visitInModal(url, onSuccess);
    };

    this.$inertia.on("success", (event) => {
        if (typeof modal.value?.onSuccess === "function") {
            modal.value.onSuccess(event);
        }

        close();
    });
})
</script>
<template>
    <JetstreamModal :show="modal != null" @close="close">
        <component :is="modal.component" v-if="modal" v-bind="modal.page.props"/>
    </JetstreamModal>
</template>
