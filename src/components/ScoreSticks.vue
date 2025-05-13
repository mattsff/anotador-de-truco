<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '@/stores';
import { GAME_POINTS_15, GAME_POINTS_30 } from '@/config';
import SticksSection from './SticksSection.vue';

export default defineComponent({
  name: 'ScoreSticks',
  components: { SticksSection },
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const gameStore = useGameStore();

    const pointsToWin = computed(() => gameStore.pointsToWin);

    const is30Points = computed(() => pointsToWin.value === GAME_POINTS_30);
    const is15Points = computed(() => pointsToWin.value === GAME_POINTS_15);

    const pointsMalas = computed(() =>
      is30Points.value ? Math.min(props.score, GAME_POINTS_15) : props.score
    );

    const pointsBuenas = computed(() =>
      is30Points.value ? Math.max(props.score - GAME_POINTS_15, 0) : 0
    );

    const buildGroups = (points: number) => {
      const totalGroups = Math.floor(points / 5);
      const remainder = points % 5;
      const result = [];
      for (let i = 0; i < Math.min(totalGroups, 3); i++) {
        result.push(5);
      }
      if (totalGroups < 3 && remainder > 0) {
        result.push(remainder);
      }
      return result;
    };

    return {
      is30Points,
      is15Points,
      pointsMalas,
      pointsBuenas,
      buildGroups,
    };
  },
});
</script>

<template>
  <div >
    <SticksSection
      v-if="is30Points"
      label="Malas"
      :points="pointsMalas"
      key-prefix="malas"
      :build-groups="buildGroups"
    />
    <SticksSection
      v-if="is30Points"
      label="Buenas"
      :points="pointsBuenas"
      key-prefix="buenas"
      :build-groups="buildGroups"
    />
    <SticksSection
      v-if="is15Points"
      :points="score"
      key-prefix="15"
      :build-groups="buildGroups"
    />
  </div>
</template>