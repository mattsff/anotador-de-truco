<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useTeamsStore, useGameStore,useHistoryStore } from '@/stores';
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

    const addPoints = (team: 1 | 2) => {
      const points = 1;
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
    };

    const subtractPoints = (team: 1 | 2) => {
      const points = 1;
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
    <div class="point-controls__buttons">
      <div class="point-controls__team-buttons">
        <button
          @click="subtractPoints(1)"
          class="point-controls__subtract"
        >
          {{ t('pointControls.subtract') }}
        </button>
        <button
          @click="addPoints(1)"
          class="point-controls__add"
        >
          {{ t('pointControls.add') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.point-controls {
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 90%;
  &__add {
    color: white;
    font-size: 16px;
    background-color: v(--success);
    &:hover {
      background-color: v(--success-hover);
    }
  }
  &__subtract {
    color: white;
    font-size: 16px;
    background-color: v(--danger);
    &:hover {
      background-color: v(--danger-hover);
    }
  }
}
</style>
