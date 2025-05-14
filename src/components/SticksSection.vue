<script lang="ts" setup>
import { computed } from 'vue';
import { buildGroups } from '@/utils/game';

const props = defineProps<{
  points: number;
  label?: string | null;
  labelColor?: string;
}>();

const groups = computed(() => {
  const safePoints = Math.max(props.points, 0);
  return buildGroups(safePoints);
});
</script>

<template>
  <div class="sticks-section">
    <div v-if="label" class="sticks-section__label" :style="{ color: labelColor ?? '#ddd' }">
      {{ label }}
    </div>
    <div v-for="(sticks, groupIndex) in groups" :key="`group-${groupIndex}`" class="group">
      <div
        v-for="n in sticks"
        :key="`stick-${groupIndex}-${n}`"
        class="stick-image"
        :class="'pos-' + n"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.sticks-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 320px;
}

.sticks-section__label {
  font-weight: bold;
  font-size: 14px;
  text-align: center;
}

.group {
  position: relative;
  width: 70px;
  height: 70px;
}

.stick-image {
  width: 6px;
  height: 70px;
  background: url('../assets/point.png') no-repeat center;
  background-size: cover;
}

.pos-1 {
  position: absolute;
  transform: rotate(90deg);
  top: -30px;
  left: 32px;
}

.pos-2 {
  position: absolute;
  transform: rotate(180deg);
  left: 65px;
  top: 0px;
}

.pos-3 {
  position: absolute;
  transform: rotate(270deg);
  top: 32px;
  left: 32px;
}

.pos-4 {
  position: absolute;
  left: 0px;
  top: 0px;
}

.pos-5 {
  position: absolute;
  transform: rotate(45deg);
  left: 34px;
  top: 0px;
}
</style>