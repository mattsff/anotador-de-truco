<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGameStore } from '@/stores';

const gameStore = useGameStore();
const { t } = useI18n();

const animationText = computed(() =>
  t('victoryAnimation.title', { teamName: gameStore.winningTeam })
);

const cancelWin = () => {
  gameStore.cancelWin();
};

const newGame = () => {
  gameStore.resetGame();
};
</script>

<template>
  <div v-if="gameStore.gameEnded" class="victory-animation" role="alert" aria-live="assertive">
    <div class="victory-animation__container">
      <h2 class="victory-animation__title">
        {{ animationText }}
      </h2>
      <div class="victory-animation__buttons">
         <button @click="newGame" class="victory-animation__primary-button">
          {{ t('victoryAnimation.newGame') }}
        </button>
        <button @click="cancelWin" class="victory-animation__secondary-button">
          {{ t('victoryAnimation.cancelWin') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.victory-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(3px);

  &__container {
    width: 80vw;
  }

  &__title {
    font-size: var(--font-size-xxl);
    font-weight: 800;
    color: var(--color-success-default);
    animation: pulse 1.8s ease-in-out infinite;
    padding: var(--spacing-md) var(--spacing-lg);
    border: 4px solid var(--color-success-default);
    border-radius: var(--radius-lg);
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
    background-color: rgba(255, 255, 255, 0.05);
    margin-bottom: var(--spacing-lg);
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__primary-button,
  &__secondary-button {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-lg);
    font-weight: bold;
    border-radius: var(--radius-sm);
    border: none;
    cursor: pointer;
    background-color: var(--color-primary-default);
    color: var(--color-surface-default);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-primary-hover);
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
