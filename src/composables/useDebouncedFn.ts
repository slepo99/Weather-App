import { onUnmounted } from "vue";
import debounce from "lodash/debounce";
import { DEBOUNCE_DELAY } from "@/constants/api";

export function useDebouncedFn<T extends (...args: any[]) => any>(
  fn: T,
  delay = DEBOUNCE_DELAY,
) {
  const debouncedFn = debounce((...args: Parameters<T>) => {
    fn(...args);
  }, delay);

  onUnmounted(() => debouncedFn.cancel());

  return debouncedFn;
}
