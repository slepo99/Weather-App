<template>
  <div class="page-wrapper">
    <div class="cards-wrapper">
      <template
        v-if="
          favoritesStore.isWeatherLoading &&
          !favoritesStore.favoriteCitiesWeather.length
        "
      >
        <WeatherCardSkeleton />
      </template>
      <template v-else-if="!favoritesStore.isWeatherLoading && !favoritesStore.favoriteCitiesWeather.length">
        <div class="favorites-empty-message">
          <h3>{{ t("favorites.emptyMessage") }}</h3>
        </div>
      </template>
      <template v-else>
        <div
          v-for="value in favoritesStore.favoriteCitiesWeather"
          :key="value.id"
        >
          <WeatherCard
            :weather="value"
            :chart="{
              hourly: {
                labels: value.weatherByHours.times,
                data: value.weatherByHours.temps,
              },
              daily: {
                labels: value.weatherByDays.days,
                data: value.weatherByDays.temps,
              },
            }"
            :isFavoriteToggleVisible="false"
            :isFavorite="favoritesStore.isFavorite(value.id)"
            @removeCityWeather="requestRemoveCity(value)"

          />
        </div>

        <WeatherCardSkeleton v-if="favoritesStore.isWeatherLoading" />
      </template>
    </div>
    <CustomModal :isOpen="isRemoveModalOpen" @close="closeRemoveModal">
      <template #title>
        <h3>{{ t("favorites.modal.message") }}</h3>
      </template>
      <template #actions="{ close }">
        <div class="city-remove-modal__actions">
          <CustomBtn @click="close" width="60px">
            <template #label>
              {{ t("favorites.modal.cancelButton") }}
            </template>
          </CustomBtn>
          <CustomBtn @click="confirmRemoveCity" width="60px">
            <template #label>
              {{ t("favorites.modal.confirmButton") }}
            </template>
          </CustomBtn>
        </div>
      </template>
    </CustomModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFavoritesStore } from "@/stores/favorites";
import { useI18n } from "vue-i18n";
import type { FormattedWeather } from "@/stores/weather/models";
import WeatherCard from "@/components/Main/WeatherCard.vue";
import WeatherCardSkeleton from "@/components/Main/WeatherCardSkeleton.vue";
import CustomModal from "@/components/UI/CustomModal.vue";
import CustomBtn from "@/components/UI/CustomBtn.vue";
const favoritesStore = useFavoritesStore();
const { locale, t } = useI18n();
const cityWeatherToRemove = ref<FormattedWeather | null>(null);
const isRemoveModalOpen = ref(false);

function requestRemoveCity(weather: FormattedWeather) {
  cityWeatherToRemove.value = weather;
  isRemoveModalOpen.value = true;
}
function confirmRemoveCity() {
  favoritesStore.removeFavorite(cityWeatherToRemove.value);
  isRemoveModalOpen.value = false;
}
function closeRemoveModal() {
  isRemoveModalOpen.value = false;
}
onMounted(() => {
  favoritesStore.loadFromStorage();
  favoritesStore.loadFavoriteCitiesWeather(locale.value);
});
</script>

<style scoped>
.cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.favorites-empty-message {
  text-align: center;
}
.city-remove-modal__actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
</style>
