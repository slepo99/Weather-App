import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BREAKPOINTS } from '@/constants/markup'

export function useResponsive() {
  const width = ref(window.innerWidth)

  const handleResize = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  const isMobile = computed(() => width.value <= BREAKPOINTS.mobile)
  const isTablet = computed(() =>
    width.value > BREAKPOINTS.mobile && width.value <= BREAKPOINTS.tablet
  )
  const isMiniDesktop = computed(() =>
    width.value > BREAKPOINTS.tablet && width.value <= BREAKPOINTS.miniDesktop
  )
  const isDesktop = computed(() =>
    width.value > BREAKPOINTS.miniDesktop
  )

  return { isMobile, isTablet, isMiniDesktop, isDesktop }
}