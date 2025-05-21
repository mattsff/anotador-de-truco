<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import ConfirmResetPopup from '@/components/ConfirmResetPopup.vue';
import { GAME_POINTS_15, GAME_POINTS_30 } from '@/config';

const gameStore = useGameStore();
const { t } = useI18n();

const pointsToWin = computed(() => gameStore.pointsToWin);

const confirmPopupRef = ref<InstanceType<typeof ConfirmResetPopup> | null>(null);
const pendingPoints = ref<number | null>(null);

const setPointsToWin = (points: number) => {
  if (points !== gameStore.pointsToWin) {
    pendingPoints.value = points;
    confirmPopupRef.value?.showPopup();
  }
};

const confirmChange = () => {
  if (pendingPoints.value !== null) {
    gameStore.setPointsToWin(pendingPoints.value);
    pendingPoints.value = null;
  }
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
    <ConfirmResetPopup
      ref="confirmPopupRef"
      :onConfirm="confirmChange"
      :title="t('gameConfig.confirmChangeTitle')"
      :message="t('gameConfig.confirmChangeMessage')"
      :confirmText="t('gameConfig.confirm')"
      :cancelText="t('gameConfig.cancel')"
    />
  </section>
</template>

<style scoped lang="scss">
.game-config {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
  margin-bottom: var(--spacing-lg);
  max-width: 400px;

  &__title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-custom-title);
  }

  &__options {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    justify-content: center;
  }

  &__option {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 2px solid var(--color-primary-default);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: transparent;
    color: var(--color-primary-default);

    &--active {
      background-color: var(--color-primary-default);
      color: var(--color-text-inverse);
    }

    &:hover {
      background-color: var(--color-primary-hover);
      color: var(--color-text-inverse);
    }
  }
}
</style>
