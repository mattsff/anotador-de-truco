<script setup lang="ts">
import {  useGameStore } from '@/stores';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  teamNumber: 1 | 2;
}>();

const gameStore = useGameStore();
const { t } = useI18n();

const addPoints = () => {
  if (props.teamNumber === 1) {
    gameStore.incrementTeam1Score();
  } else {
    gameStore.incrementTeam2Score();
  }
};

const subtractPoints = () => {
  if (props.teamNumber === 1) {
    gameStore.decrementTeam1Score();
  } else {
    gameStore.decrementTeam2Score();
  }
};
</script>

<template>
  <div class="point-controls">
    <button
      @click="subtractPoints"
      class="point-controls__button point-controls__button--subtract"
  
    >
      {{ t('pointControls.subtract') }}
    </button>
    <button
      @click="addPoints"
      class="point-controls__button point-controls__button--add"
    >
      {{ t('pointControls.add') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.point-controls {
  display: flex;
  gap: 10px;
  margin-top: 10px;

  &__button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    color: white;

    &:active {
      transform: scale(0.95);
    }

    &--add {
      background-color: var(--color-success, #4caf50);

      &:hover {
        background-color: var(--color-success-hover, #43a047);
      }
    }

    &--subtract {
      background-color: var(--color-danger, #e5393577);

      &:hover {
        background-color: var(--color-danger-hover, #d32f2f);
      }
    }
  }
}
</style>