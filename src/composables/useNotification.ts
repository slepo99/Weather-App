import { ref } from "vue";
import type { Ref } from "vue";
interface NotificationComposable {
  isVisible: Ref<boolean>;
  text: Ref<string>;
  showNotification(message: string, duration?: number): void;
  hideNotification(): void;
}

const text = ref("");
const isVisible = ref(false);
let timeout: ReturnType<typeof setTimeout> | null = null;

export function useNotification(): NotificationComposable {
  const showNotification = (message: string, duration: number = 3000): void => {
    if (timeout) clearTimeout(timeout);
    text.value = message;
    isVisible.value = true;
    timeout = setTimeout(() => {
      isVisible.value = false;
    }, duration);
  };
  const hideNotification = (): void => {
    isVisible.value = false;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return { isVisible, text, showNotification, hideNotification };
}
