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
    <div>
      <h2 class="victory-animation__title">
        {{ animationText }}
      </h2>
      <div class="victory-animation__buttons">
        <button @click="cancelWin" class="victory-animation__button">
          {{ t('victoryAnimation.cancelWin') }}
        </button>
        <button @click="newGame" class="victory-animation__button">
          {{ t('victoryAnimation.newGame') }}
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
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(3px);

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--success, #4caf50);
    animation: pulse 1.8s ease-in-out infinite;
    padding: 1rem 2rem;
    border: 4px solid var(--success, #4caf50);
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
    background-color: rgba(255, 255, 255, 0.05);
    margin-bottom: 2rem;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__button {
    padding: 0.75rem 1.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background-color: var(--color-primary, #2196f3);
    color: white;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-primary-hover, #1976d2);
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