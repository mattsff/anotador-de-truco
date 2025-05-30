<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useTeamsStore, useGameStore } from '@/stores'
import SticksSection from '@/components/SticksSection.vue'
import PointControls from '@/components/PointControls.vue'
import { GAME_POINTS_15 } from '@/config'
import { storeToRefs } from 'pinia'
import VictoryAnimation from '@/components/VictoryAnimation.vue'

const teamsStore = useTeamsStore()
const gameStore = useGameStore()
const { team1Name, team2Name } = storeToRefs(teamsStore)
const { team1Score, team2Score } = storeToRefs(gameStore)

const pointsToWin = computed(() => gameStore.pointsToWin)

const getDisplayData = (score: number) => {
  if (pointsToWin.value === GAME_POINTS_15) {
    return { label: null, points: score, labelColor: undefined }
  }

  if (score <= GAME_POINTS_15) {
    return { label: 'Malas', points: score, labelColor: 'red' }
  }

  return {
    label: 'Buenas',
    points: score - GAME_POINTS_15,
    labelColor: 'green',
  }
}

const playVictorySound = () => {
  const audio = new Audio('/sounds/victory.mp3')
  audio.play()
}

watch(
  () => gameStore.gameEnded,
  (ended) => {
    if (ended) playVictorySound()
  }
)
</script>

<template>
  <div class="scoreboard">
    <div class="scoreboard__teams">
      <div class="scoreboard__team">
        <div class="scoreboard__team-name">
          <span class="scoreboard__team-name-text">{{ team1Name }}</span>
          <span class="scoreboard__team-score">({{ team1Score }})</span>
        </div>
        <SticksSection
          :label="getDisplayData(team1Score).label"
          :points="getDisplayData(team1Score).points"
          :label-color="getDisplayData(team1Score).labelColor"
        />
        <PointControls :teamNumber="1" />
      </div>

      <div class="scoreboard__team">
        <div class="scoreboard__team-name">
          <span class="scoreboard__team-name-text">{{ team2Name }}</span>
          <span class="scoreboard__team-score">({{ team2Score }})</span>
        </div>
        <SticksSection
          :label="getDisplayData(team2Score).label"
          :points="getDisplayData(team2Score).points"
          :label-color="getDisplayData(team2Score).labelColor"
        />
        <PointControls :teamNumber="2" />
      </div>
    </div>
  </div>
  <teleport to="body">
    <VictoryAnimation
      v-if="gameStore.gameEnded"
      :winningTeam="gameStore.winningTeam"
    />
  </teleport>
</template>

<style lang="scss">
.scoreboard {
  color: var(--color-text-base);
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  height: 100%;

  &__teams {
    background-color: var(--color-background-alt);
    padding: var(--spacing-sm);
    border-radius: var(--radius-lg);
    height: 100%;
    max-height: 600px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: var(--spacing-lg);
    flex: 1;
  }

  &__team {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-surface-default);
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    flex: 1 1 0;
    min-width: 0;
  }
}

.scoreboard__team-name {
  display: flex; // Cambia a inline-flex para que el bloque se centre como texto
  white-space: nowrap;
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-sm);
  align-items: center;
  font-weight: 700;
  justify-content: center;
  width: 100%;

  &-text {
    max-width: 10em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 0.5em;
  }

  &-score {
    font-weight: bold;
    white-space: nowrap;
    margin-left: 0.2em;
  }
}
</style>
