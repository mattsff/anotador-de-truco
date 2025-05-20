<script lang="ts" setup>
import { computed } from 'vue';
import { useTeamsStore, useGameStore } from '@/stores';
import SticksSection from '@/components/SticksSection.vue';
import PointControls from '@/components/PointControls.vue';
import { GAME_POINTS_15, GAME_POINTS_30 } from '@/config';
import { storeToRefs } from 'pinia';

const teamsStore = useTeamsStore();
const gameStore = useGameStore();
const { team1Name, team2Name } = storeToRefs(teamsStore);
const { team1Score, team2Score } = storeToRefs(gameStore);

const pointsToWin = computed(() => gameStore.pointsToWin);

const getDisplayData = (score: number) => {
  if (pointsToWin.value === GAME_POINTS_15) {
    return { label: null, points: score, labelColor: undefined };
  }

  if (score <= GAME_POINTS_15) {
    return { label: 'Malas', points: score, labelColor: 'red' };
  }

  return { label: 'Buenas', points: score - GAME_POINTS_15, labelColor: 'green' };
};
</script>

<template>
  <div class="scoreboard">
    <div class="scoreboard__teams">
      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team1Name }} ({{ team1Score }})</div>
        <SticksSection
          :label="getDisplayData(team1Score).label"
          :points="getDisplayData(team1Score).points"
          :label-color="getDisplayData(team1Score).labelColor"
        />
        <PointControls :teamNumber="1" />
      </div>

      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team2Name }} ({{ team2Score }})</div>
        <SticksSection
          :label="getDisplayData(team2Score).label"
          :points="getDisplayData(team2Score).points"
          :label-color="getDisplayData(team2Score).labelColor"
        />
        <PointControls :teamNumber="2" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.scoreboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background-default); 
  color: var(--color-text-base); 
  padding: var(--spacing-md);
  border-radius: var(--radius-lg); 

  &__teams {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: var(--spacing-lg);
    max-width: 600px;
  }

  &__team {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-surface-inverse);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
  }

  &__team-name {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-sm);
  }
}
</style>
