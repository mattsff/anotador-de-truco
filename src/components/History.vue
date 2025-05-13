<script setup lang="ts">
import { useHistoryStore } from '@/stores';
import { useI18n } from 'vue-i18n';

const historyStore = useHistoryStore();
const { t } = useI18n();
</script>

<template>
  <section class="history">
    <h2 class="history__title">{{ t('history.title') }}</h2>

    <div v-if="historyStore.pointsLog.length === 0" class="history__empty">
      {{ t('history.emptyMessage') }}
    </div>

    <ul v-else class="history__list">
      <li
        v-for="(record, index) in historyStore.pointsLog"
        :key="index"
        class="history__record"
      >
        <span class="history__team">{{ record.team }}:</span>
        <span :class="['history__points', record.points >= 0 ? 'success' : 'danger']">
          {{ record.points }} {{ t('history.pts') }}
        </span>
        <span class="history__action">({{ record.action }})</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.history {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg, 1.5rem);
  border-radius: var(--border-radius, 12px);
  background-color: var(--color-surface, #fff);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-lg, 1.5rem);
  width: 90%;
  max-width: 400px;

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--title-color, #333);
  }

  &__empty {
    font-size: 1rem;
    color: var(--text-muted, #888);
    margin-top: 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.75rem;
  }

  &__record {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color, #eee);
    font-size: 1rem;
    &:last-child {
      border-bottom: none;
    }
  }

  &__team {
    font-weight: 600;
    color: var(--text-primary, #333);
  }

  &__points {
    font-weight: 700;
    &.success {
      color: var(--success, #43a047);
    }
    &.danger {
      color: var(--danger, #e53935);
    }
  }

  &__action {
    color: var(--text-muted, #888);
    font-size: 0.875rem;
  }
}
</style>