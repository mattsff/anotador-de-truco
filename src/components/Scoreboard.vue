<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useTeamsStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import ScoreSticks from '@/components/ScoreSticks.vue';
import PointControls from '@/components/PointControls.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Scoreboard',
  components: {
    ScoreSticks,
    PointControls,
  },
  setup() {
   const teamsStore = useTeamsStore();
   const { team1Name, team1Score, team2Name, team2Score } = storeToRefs(teamsStore);

    return {
      team1Name,
      team2Name,
      team1Score,
      team2Score,
      teamsStore,
    };
  },
});
</script>

<template>
  <div class="scoreboard">
    <div class="scoreboard__teams">
      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team1Name }} ({{ team1Score }})</div>
        <ScoreSticks :score="team1Score" />
        <PointControls :teamNumber="1" />
      </div>

      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team2Name }} ({{ team2Score }})</div>
        <ScoreSticks :score="team2Score" />
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
  background-color: #1c1c2b;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  &__teams {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
    max-width: 600px;
  }
  &__team {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2d2d44;
    padding: 15px;
    border-radius: 8px;
  }
  &__team-name {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>