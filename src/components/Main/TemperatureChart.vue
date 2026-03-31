<template>
  <div class="chart-wrapper">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps<{
  labels: string[];
  data: number[];
  title?: string;
  unit?: string;
}>();
const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

function createOrUpdateChart() {
  if (!canvasRef.value) return;

  chartInstance = new Chart(canvasRef.value, {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.title || "",
          data: props.data,
          backgroundColor: "#3b82f6",
          borderColor: "#2563eb",
          borderWidth: 2,
          borderRadius: 6,
          barThickness: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false, position: "top" as const },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {display: false},
          ticks: { callback: (val) => `${val}°` },
        },
        x: {
          grid: {display: false},
        },
      },
    },
  });
}
onMounted(() => setTimeout(createOrUpdateChart, 50));

watch(
  () => [props.labels, props.data],
  () => createOrUpdateChart(),
  { deep: true },
);

onUnmounted(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
}
</style>
