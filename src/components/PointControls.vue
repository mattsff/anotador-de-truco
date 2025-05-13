<script setup lang="ts">
import { useTeamsStore, useGameStore, useHistoryStore } from '@/stores';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  teamNumber: 1 | 2;
}>();

const teamsStore = useTeamsStore();
const gameStore = useGameStore();
const historyStore = useHistoryStore();
const { t } = useI18n();

const teamName = computed(() =>
  props.teamNumber === 1 ? teamsStore.team1Name : teamsStore.team2Name
);

const addPoints = () => {
  const points = 1;
  if (props.teamNumber === 1) {
    teamsStore.incrementTeam1Score(points);
  } else {
    teamsStore.incrementTeam2Score(points);
  }
  historyStore.logPointChange({
    team: teamName.value,
    points,
    action: 'sumar',
  });
  gameStore.checkWinCondition();
};

const subtractPoints = () => {
  const points = 1;
  if (props.teamNumber === 1) {
    teamsStore.decrementTeam1Score(points);
  } else {
    teamsStore.decrementTeam2Score(points);
  }
  historyStore.logPointChange({
    team: teamName.value,
    points: -points,
    action: 'restar',
  });
};
</script>

<template>
  <div class="point-controls">
    <button
      @click="subtractPoints"
      class="point-controls__button point-controls__button--subtract"
      :aria-label="t('pointControls.subtract') + ' ' + teamName"
      :title="t('pointControls.subtract') + ' ' + teamName"
    >
      {{ t('pointControls.subtract') }}
    </button>
    <button
      @click="addPoints"
      class="point-controls__button point-controls__button--add"
      :aria-label="t('pointControls.add') + ' ' + teamName"
      :title="t('pointControls.add') + ' ' + teamName"
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