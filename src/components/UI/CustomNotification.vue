<template>
    <div class="custom-notification" :class="{ active: isVisible }">
        <div  class="notification-message">
            {{ text }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNotification } from '@/composables/useNotification'

const { isVisible, text } = useNotification()
</script>

<style scoped>
.custom-notification {
 position: fixed;
  top: 20px;
  right: 20px;
  transform: translateY(-150%);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 9999;
  background: #18181b;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
  white-space: nowrap;
}
.custom-notification.active {
  transform: translateY(0);
  opacity: 1;
}
</style>