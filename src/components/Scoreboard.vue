<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useTeamsStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import ScoreSticks from '@/components/ScoreSticks.vue';
import PointControls from '@/components/PointControls.vue';

export default defineComponent({
  name: 'Scoreboard',
  components: {
    ScoreSticks,
    PointControls,
  },
  setup() {
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

    return {
      team1,
      team2,
      t,
      teamsStore,
    };
  },
});
</script>

<template>
  <div class="scoreboard">
    <div class="scoreboard__teams">
      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team1.name }} ({{ team1.score }})</div>
        <ScoreSticks :score="team1.score" />
        <PointControls :teamNumber="1" />
      </div>

      <div class="scoreboard__team">
        <div class="scoreboard__team-name">{{ team2.name }} ({{ team2.score }})</div>
        <ScoreSticks :score="team2.score" />
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