import { ref, onMounted, onUnmounted } from 'vue';

export default function useCarousel(totalSlides, options) {
    const {
        autoplay = false,
        autoplayInterval = 3000
    } = options;

    const currentSlide = ref(0);
    const interval = ref(null);

    const slideTo = (index) => {
        currentSlide.value = index % totalSlides; // Ensure the index wraps around.
        resetInterval();
    };

    const nextSlide = () => {
        slideTo(currentSlide.value + 1);
    };

    const previousSlide = () => {
        slideTo(currentSlide.value - 1 + totalSlides); // Ensure wrapping correctly when going backwards.
    };

    const resetInterval = () => {
        clearInterval(interval.value);
        if (autoplay) {
            interval.value = setInterval(nextSlide, autoplayInterval);
        }
    };

    onMounted(() => {
        if (autoplay) {
            resetInterval();
        }
    });

    onUnmounted(() => {
        clearInterval(interval.value);
    });

    return { currentSlide, nextSlide, previousSlide, totalSlides, slideTo };
}
