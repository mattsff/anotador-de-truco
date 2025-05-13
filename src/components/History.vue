<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useHistoryStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import { dimensions } from '@/config';

export default defineComponent({
  name: 'History',
  setup() {
    const historyStore = useHistoryStore();
    const { t } = useI18n();

    const history = computed(() => historyStore.pointsLog);

    return {
      history,
      t,
      dimensions,
    };
  },
});
</script>

<template>
  <div class="history">
    <h2 class="history__title">{{ t('history.title') }}</h2>
    <div v-if="history.length === 0" class="history__empty">
      No hay movimientos registrados.
    </div>
    <div v-else class="history__list">
      <div v-for="(record, index) in history" :key="index" class="history__record">
        <span class="history__team">{{ record.team }}:</span>
       <span
        :class="['history__points', record.points >= 0 ? 'history__points--success' : 'history__points--danger']"
        >
          {{ record.points }} {{ t('history.pts') }}
        </span>
        <span class="history__action">({{ record.action }})</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.history {
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
  &__empty {
    font-size: 16px;
    color: #888;
    margin-bottom: 20px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__record {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    &:last-child {
      border-bottom: none;
    }
  }
  &__team {
    font-weight: bold;
    color: #333;
  }
  &__points {
    font-weight: bold;
  }
  &__action {
    color: #888;
    font-size: 14px;
  }
  &__points--success {
    color: var(--success);  
  }
  &__points--danger {
    color: var(--danger);
  }
}
</style>
