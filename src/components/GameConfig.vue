<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useGameStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import { dimensions, GAME_POINTS_15, GAME_POINTS_30 } from '@/config';

export default defineComponent({
  name: 'GameConfig',
  setup() {
    const gameStore = useGameStore();
    const { t } = useI18n();

    const pointsToWin = computed(() => gameStore.pointsToWin);

    const setPointsToWin = (points: number) => {
      gameStore.setPointsToWin(points);
    };

    return {
      pointsToWin,
      setPointsToWin,
      t,
      dimensions,
      GAME_POINTS_15,
      GAME_POINTS_30
    };
  },
});
</script>

<template>
  <div class="game-config">
    <h2 class="game-config__title">{{ t('gameConfig.title') }}</h2>
    <div class="game-config__options">
      <button
        @click="setPointsToWin(GAME_POINTS_15)"
        class="game-config__option"
        :class="{ 'game-config__option--active': pointsToWin === GAME_POINTS_15 }"
        :style="{
          borderRadius: dimensions.borderRadius,
          padding: dimensions.buttonPadding,
          marginRight: dimensions.buttonMargin,
        }"
      >
        {{ t('gameConfig.fifteen') }}
      </button>
      <button
        @click="setPointsToWin(GAME_POINTS_30)"
        class="game-config__option"
        :class="{ 'game-config__option--active': pointsToWin === GAME_POINTS_30 }"
        :style="{
          borderRadius: dimensions.borderRadius,
          padding: dimensions.buttonPadding,
        }"
      >
        {{ t('gameConfig.thirty') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.game-config {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 90%;
  max-width: 400px;
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: v(--title-color);
  }
  &__options {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  &__option {
    padding: 10px 20px;
    border: 2px solid v(--primary);
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0 10px;
    &--active {
      background-color: v(--primary);
      color: #fff;
    }
    &:hover {
      background-color: v(--primary-hover);
      color: #fff;
    }
  }
}
</style>
