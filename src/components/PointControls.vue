<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useTeamsStore } from '@/stores/teams';
import { useGameStore } from '@/stores/game';
import { useHistoryStore } from '@/stores/history';
import { useI18n } from 'vue-i18n';
import { dimensions } from '@/config';

export default defineComponent({
  name: 'PointControls',
  setup() {
    const teamsStore = useTeamsStore();
    const gameStore = useGameStore();
    const historyStore = useHistoryStore();
    const { t } = useI18n();

    const team1Name = computed(() => teamsStore.team1Name);
    const team2Name = computed(() => teamsStore.team2Name);

    const addPoints = (team: 1 | 2, points: number) => {
      if (!gameStore.gameEnded) {
        if (team === 1) {
          teamsStore.incrementTeam1Score(points);
        } else {
          teamsStore.incrementTeam2Score(points);
        }
        historyStore.logPointChange({
          team: team === 1 ? team1Name.value : team2Name.value,
          points,
          action: 'sumar',
        });
        gameStore.checkWinCondition();
      }
    };

    const subtractPoints = (team: 1 | 2, points: number) => {
      if (!gameStore.gameEnded) {
        if (team === 1) {
          teamsStore.decrementTeam1Score(points);
        } else {
          teamsStore.decrementTeam2Score(points);
        }
        historyStore.logPointChange({
          team: team === 1 ? team1Name.value : team2Name.value,
          points: -points,
          action: 'restar',
        });
      }
    };

    return {
      team1Name,
      team2Name,
      addPoints,
      subtractPoints,
      t,
      dimensions,
    };
  },
});
</script>

<template>
  <div class="point-controls">
    <h2 class="point-controls__title">Control de Puntos</h2>
    <div class="point-controls__buttons">
      <div class="point-controls__team-buttons">
        <h3 class="point-controls__team-name">{{ team1Name }}</h3>
        <button
          @click="addPoints(1, 1)"
          class="point-controls__add"
          :style="{
            color: '#fff',
            borderRadius: dimensions.borderRadius,
            padding: dimensions.buttonPadding,
            marginRight: dimensions.buttonMargin,
      
          }"
        >
          {{ t('pointControls.add') }} 1
        </button>
        <button
          @click="subtractPoints(1, 1)"
          class="point-controls__subtract"
          :style="{
            color: '#fff',
            borderRadius: dimensions.borderRadius,
            padding: dimensions.buttonPadding,
          }"
        >
          {{ t('pointControls.subtract') }} 1
        </button>
      </div>
      <div class="point-controls__team-buttons">
        <h3 class="point-controls__team-name">{{ team2Name }}</h3>
        <button
          @click="addPoints(2, 1)"
          class="point-controls__add"
          :style="{
            color: '#fff',
            borderRadius: dimensions.borderRadius,
            padding: dimensions.buttonPadding,
            marginRight: dimensions.buttonMargin,
          }"
        >
          {{ t('pointControls.add') }} 2
        </button>
        <button
          @click="subtractPoints(2, 1)"
          class="point-controls__subtract"
          :style="{
            color: '#fff',
            borderRadius: dimensions.borderRadius,
            padding: dimensions.buttonPadding,
          }"
        >
          {{ t('pointControls.subtract') }} 2
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.point-controls {
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
  &__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__team-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48%;
  }
  &__team-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: v(--text-color);
  }
  &__add,
  &__subtract {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }
  &__add {
    background-color: v(--success);
    &:hover {
      background-color: v(--success-hover);
    }
  }
  &__subtract {
    background-color: v(--danger);
    &:hover {
      background-color: v(--danger-hover);
    }
  }
}
</style>
