<template>
  <div class="card-wrapper">
    <div class="weather-card__header">
      <CustomSkeleton height="32px" width="300px" />
      <CustomSkeleton height="32px" width="40px" />
    </div>
    <CustomDivider />
    <div class="weather-card__info">
      <div class="weather-card__current">
        <CustomSkeleton
          rounded
          width="100px"
          min-width="100px"
          height="100px"
        />
        <div class="weather-card__status">
          <CustomSkeleton height="100px" min-width="100px" />
        </div>
      </div>
      <CustomDivider vertical />
      <div class="weather-card__details">
        <CustomSkeleton height="100px" />
      </div>
    </div>
    <CustomDivider />
    <div class="weather-card__chart">
      <CustomSkeleton height="180px" />
    </div>
    <CustomDivider />
    <div class="weather-card__controls">
      <CustomSkeleton height="32px" width="140px" />
      <CustomSkeleton height="32px" width="80px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomSkeleton from "../UI/CustomSkeleton.vue";
import CustomDivider from "../UI/CustomDivider.vue";
</script>
<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--content-bg);
  padding: 24px;
  border-radius: 10px;
  box-shadow: $block-shadow;

  @media (max-width: 900px) {
    padding: 16px;
  }
  @media (max-width: 478px) {
    padding: 12px;
  }
}

.weather-card__header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.weather-card__info {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;

  @media (max-width: 600px) {
    gap: 10px;
  }
  @media (max-width: 478px) {
    flex-direction: column;
    gap: 2px;

    hr {
      display: none;
    }
  }
}

.weather-card__current {
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 600px) {
    gap: 8px;
  }
  @media (max-width: 478px) {
    width: 100%;
  }
}

.weather-card__status {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  @media (max-width: 478px) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.weather-card__details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  gap: 6px;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 12px;
  }
}

.weather-card__chart {
  width: 100%;
}

.weather-card__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
}
</style>
