import { ref, onMounted, onUnmounted, Ref } from 'vue';

const MOBILE_MAX = 767;

export interface ResponsiveState {
  width: Ref<number>;
  isMobile: Ref<boolean>;
}

export function useResponsive(): ResponsiveState {
  const width = ref<number>(window.innerWidth);
  const isMobile = ref<boolean>(width.value <= MOBILE_MAX);

  const handleResize = () => {
    width.value = window.innerWidth;
    isMobile.value = width.value <= MOBILE_MAX;
  };

  onMounted(() => window.addEventListener('resize', handleResize));
  onUnmounted(() => window.removeEventListener('resize', handleResize));

  return { width, isMobile };
}
