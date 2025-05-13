
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore, useTeamsStore} from '@/stores';
import { useI18n } from 'vue-i18n';
import { dimensions, GAME_POINTS_30 } from '@/config'; // Importa desde el archivo de configuración

export default defineComponent({
  name: 'Scoreboard',
  setup() {
    const gameStore = useGameStore();
    const teamsStore = useTeamsStore();
    const { t } = useI18n();

    const team1 = computed(() => ({
      name: teamsStore.team1Name,
      score: teamsStore.team1Score,
    }));
    const team2 = computed(() => ({
      name: teamsStore.team2Name,
      score: teamsStore.team2Score,
    }));

    const is30Points = computed(() => gameStore.pointsToWin === GAME_POINTS_30);
    const isBadPoints = computed(() => gameStore.isMalas);

    return {
      team1,
      team2,
      is30Points,
      isBadPoints,
      t,
      dimensions,
      GAME_POINTS_30
    };
  },
});
</script>

<template>
  <div class="scoreboard">
    <h2 class="scoreboard__title">{{ t('scoreboard.title') }}</h2>
    <div class="scoreboard__teams">
      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team1.name }}</div>
        <div class="scoreboard__team-score">{{ team1.score }}</div>
      </div>
      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team2.name }}</div>
        <div class="scoreboard__team-score" >{{ team2.score }}</div>
      </div>
    </div>
    <div v-if="is30Points" class="scoreboard__stage" >
      {{ isBadPoints ? t('scoreboard.malas') : t('scoreboard.buenas') }}
    </div>
  </div>
</template>

<style lang="scss">
.scoreboard {
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
  &__teams {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }
  &__team {
    display: flex;
    flex-direction: column;
    align-items: center;
    &name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #555;
    }
    &score {
      font-size: 36px;
      font-weight: bold;
    }
  }
  &__stage {
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
}
</style>
