<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import { GAME_POINTS_15, GAME_POINTS_30 } from '@/config';

const gameStore = useGameStore();
const { t } = useI18n();

const pointsToWin = computed(() => gameStore.pointsToWin);

const setPointsToWin = (points: number) => {
  gameStore.setPointsToWin(points);
};

const pointOptions = [
  { label: t('gameConfig.fifteen'), value: GAME_POINTS_15 },
  { label: t('gameConfig.thirty'), value: GAME_POINTS_30 },
];
</script>

<template>
  <section class="game-config" aria-label="Game configuration">
    <h2 class="game-config__title">{{ t('gameConfig.title') }}</h2>
    <div class="game-config__options">
      <button
        v-for="option in pointOptions"
        :key="option.value"
        @click="setPointsToWin(option.value)"
        class="game-config__option"
        :class="{ 'game-config__option--active': pointsToWin === option.value }"
        :aria-pressed="pointsToWin === option.value"
      >
        {{ option.label }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.game-config {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: var(--border-radius, 10px);
  background-color: var(--color-surface, #fff);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  width: 90%;
  max-width: 400px;

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: var(--title-color, #333);
  }

  &__options {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__option {
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--primary, #1c1c2b);
    border-radius: var(--button-border-radius, 8px);
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: transparent;
    color: var(--primary, #1c1c2b);

    &--active {
      background-color: var(--primary, #1c1c2b);
      color: var(--on-primary, #fff);
    }

    &:hover {
      background-color: var(--primary-hover, #333);
      color: var(--on-primary, #fff);
    }
  }
}
</style>