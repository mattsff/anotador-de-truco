<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '@/stores';
import { GAME_POINTS_15, GAME_POINTS_30 } from '@/config';
import SticksSection from './SticksSection.vue';
import { buildGroups } from '@/utils/game';

const props = defineProps<{
  score: number;
}>();

const gameStore = useGameStore();

const pointsToWin = computed(() => gameStore.pointsToWin);

const is30Points = computed(() => pointsToWin.value === GAME_POINTS_30);
const is15Points = computed(() => pointsToWin.value === GAME_POINTS_15);

const pointsMalas = computed(() =>
  is30Points.value ? Math.min(props.score, GAME_POINTS_15) : props.score
);

const pointsBuenas = computed(() =>
  is30Points.value && props.score > GAME_POINTS_15 ? props.score - GAME_POINTS_15 : 0
);
</script>

<template>
  <div>
    <template v-if="is30Points">
      <SticksSection label="Malas" :points="pointsMalas" key-prefix="malas" :build-groups="buildGroups" />
      <SticksSection label="Buenas" :points="pointsBuenas" key-prefix="buenas" :build-groups="buildGroups" />
    </template>
    <SticksSection v-else-if="is15Points" :points="score" key-prefix="15" :build-groups="buildGroups" />
  </div>
</template>