import { ref, onMounted, onUnmounted } from 'vue'
import { BREAKPOINTS } from '@/constants/markup';
export function useResponsive(breakpoint?: number ) {
  const isMobile = ref<boolean>(window.innerWidth <= (breakpoint ? breakpoint : BREAKPOINTS.mobile) )
  const isTablet = ref<boolean>(window.innerWidth <= (breakpoint ? breakpoint : BREAKPOINTS.tablet) && window.innerWidth > (breakpoint ? breakpoint : BREAKPOINTS.mobile) )
  const isMiniDesktop = ref<boolean>(window.innerWidth <= (breakpoint ? breakpoint : BREAKPOINTS.miniDesktop) && window.innerWidth > (breakpoint ? breakpoint : BREAKPOINTS.tablet) )
  const isDesktop = ref<boolean>(window.innerWidth > (breakpoint ? breakpoint : BREAKPOINTS.desktop))
  const handleResize = () => {
    isMobile.value = window.innerWidth <= (breakpoint ? breakpoint : BREAKPOINTS.mobile)
    isTablet.value = window.innerWidth <= (breakpoint ? breakpoint : BREAKPOINTS.tablet)
    isMiniDesktop.value = window.innerWidth <= (breakpoint ? breakpoint : BREAKPOINTS.miniDesktop)
    isDesktop.value = window.innerWidth > (breakpoint ? breakpoint : BREAKPOINTS.desktop)
  }

  onMounted(() => window.addEventListener('resize', handleResize))
  onUnmounted(() => window.removeEventListener('resize', handleResize))

  return { isMobile, isTablet, isMiniDesktop, isDesktop }
}