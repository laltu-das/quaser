import { defineAsyncComponent, h, nextTick, watch, computed, ref, shallowRef, onBeforeUnmount } from 'vue'
import { usePage, useRouter } from '@inertiajs/vue3'
import axios from 'axios'

// Local resolver and state setup
const resolveCallback = ref()

const resolver = {
    setResolveCallback: (callback) => {
        resolveCallback.value = callback
    },
    resolve: (name) => resolveCallback.value(name),
}

// Component and state management for modals
const page = usePage()
const router = useRouter()
const modal = computed(() => page?.props?.modal);
const props = computed(() => modal.value?.props)
const key = computed(() => modal.value?.key)

const componentName = ref()
const component = shallowRef()
const show = ref(false)
const vnode = ref()

router.on('before', (event) => {
    if (key.value) {
        event.detail.visit.headers['X-Inertia-Modal-Key'] = key.value
        event.detail.visit.headers['X-Inertia-Modal-Redirect'] = modal.value?.redirectURL
    }
})

const close = () => {
    show.value = false
}

const resolveComponent = () => {
    if (!modal.value?.component) {
        return close()
    }

    if (componentName.value !== modal.value?.component) {
        componentName.value = modal.value.component

        if (componentName.value) {
            component.value = defineAsyncComponent(() => resolver.resolve(componentName.value))
        } else {
            component.value = null
        }
    }

    vnode.value = component.value
        ? h(component.value, {
            key: key.value,
            ...props.value,
        })
        : null;

    nextTick(() => (show.value = true))
}

watch(modal, resolveComponent, {
    deep: true,
    immediate: true,
})

const redirect = (options = {}) => {
    const redirectURL = modal.value?.redirectURL
    if (redirectURL) {
        router.visit(redirectURL, options)
    }
}

// Axios interceptor for modal backdrop preservation
axios.interceptors.response.use(function(response) {
    if (response.headers['x-inertia-modal']) {
        let { component, props } = usePage();
        props = JSON.parse(JSON.stringify(props));
        response.data.props = { ...props, ...response.data.props };
        response.data.component = component;
        response.headers['x-inertia'] = true;
    }

    return response;
});

