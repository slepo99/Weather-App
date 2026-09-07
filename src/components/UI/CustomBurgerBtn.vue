<template>
  <div class="menu-btn-1" :class="{ active: props.isActive }">
    <span></span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isActive: boolean;
  }>(),
  {
    isActive: false,
  },
);
</script>
<style scoped>
.menu-btn-1 {
  height: 32px;
  width: 32px;
  cursor: pointer;
  z-index: 999;
  position: relative;
}

.menu-btn-1 span,
.menu-btn-1 span::before,
.menu-btn-1 span::after {
  background: var(--icon);
  border-radius: 3px;
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  margin-top: 16px;

  -webkit-transition: 0.3s ease-in-out;
  -moz-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.menu-btn-1 span::before {
  margin-top: -10px;
}

.menu-btn-1 span::after {
  margin-top: 10px;
}

.menu-btn-1.active span {
  background: transparent;
}

.menu-btn-1.active span::before {
  margin-top: 0;

  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.menu-btn-1.active span::after {
  margin-top: 0;

  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
</style>
