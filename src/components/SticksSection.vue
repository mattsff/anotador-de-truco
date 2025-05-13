<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'SticksSection',
  props: {
    label: {
      type: String,
      default: '',
    },
    points: {
      type: Number,
      required: true,
    },
    keyPrefix: {
      type: String,
      required: true,
    },
    buildGroups: {
      type: Function as PropType<(points: number) => number[]>,
      required: true,
    },
  },
  setup(props) {
    const groups = computed(() => {
      const safePoints = Math.max(props.points, 0);
      return props.buildGroups(safePoints);
    });

    return {
      groups,
    };
  },
});
</script>

<template>
  <div class="score-sticks__section">
    <div v-if="label" class="score-sticks__label">{{ label }}</div>
    <div
      v-for="(sticks, groupIndex) in groups"
      :key="`${keyPrefix}-group-${groupIndex}`"
      class="group"
    >
      <div
        v-for="n in sticks"
        :key="`${keyPrefix}-stick-${groupIndex}-${n}`"
        class="stick-image"
        :class="'pos-' + n"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.score-sticks__section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 270px;
  min-width: 140px;
}

.score-sticks__label {
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  color: #ddd;
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