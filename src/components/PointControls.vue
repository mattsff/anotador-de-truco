<script setup lang="ts">
import { useGameStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const props = defineProps<{
  teamNumber: 1 | 2
}>()

const gameStore = useGameStore()
const { t } = useI18n()

let addAudio: HTMLAudioElement
let subtractAudio: HTMLAudioElement

onMounted(() => {
  addAudio = new Audio('/sounds/add.mp3')
  subtractAudio = new Audio('/sounds/subtract.mp3')
})

const playSound = (audio: HTMLAudioElement) => {
  if (!audio) return
  audio.currentTime = 0
  audio.play()
}

const addPoints = () => {
  playSound(addAudio)
  if (props.teamNumber === 1) {
    gameStore.incrementTeam1Score()
  } else {
    gameStore.incrementTeam2Score()
  }
}

const subtractPoints = () => {
  playSound(subtractAudio)
  if (props.teamNumber === 1) {
    gameStore.decrementTeam1Score()
  } else {
    gameStore.decrementTeam2Score()
  }
}
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
  gap: var(--spacing-md);

  &__button {
    padding: 8px 20px;
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    font-weight: bold;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease;

    &:active {
      transform: scale(0.95);
    }

    &--add {
      background-color: var(--color-success-default);

      &:hover {
        background-color: var(--color-success-hover);
      }
    }

    &--subtract {
      background-color: var(--color-danger-default);

      &:hover {
        background-color: var(--color-danger-hover);
      }
    }
  }
}
</style>
