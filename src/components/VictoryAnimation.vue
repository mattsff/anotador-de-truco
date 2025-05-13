<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import {  dimensions } from '@/config';

export default defineComponent({
  name: 'VictoryAnimation',
  props: {
    winningTeam: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const animationText = ref('');

    onMounted(() => {
      animationText.value = t('victoryAnimation.title', { teamName: props.winningTeam });
    });

    return {
      animationText,
      dimensions
    };
  },
});
</script>

<template>
  <div class="victory-animation">
    <h2 class="victory-animation__title">
      {{ animationText }}
    </h2>
    </div>
</template>

<style lang="scss">
.victory-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  &__title {
    font-size: 36px;
    font-weight: bold;
    animation: pulse 2s infinite;
    color: v(--success);
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
