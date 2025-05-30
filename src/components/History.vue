<script setup lang="ts">
import { useHistoryStore, useTeamsStore } from '@/stores'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const historyStore = useHistoryStore()
const teamsStore = useTeamsStore()
const { t } = useI18n()

const history = computed(() => historyStore.pointsLog.toReversed())
const teamNames = computed(() => ({
  1: teamsStore.team1Name,
  2: teamsStore.team2Name,
}))
</script>

<template>
  <section class="history">
    <h2 class="history__title">{{ t('history.title') }}</h2>

    <div v-if="history.length === 0" class="history__empty">
      {{ t('history.emptyMessage') }}
    </div>

    <ul v-else class="history__list">
      <li
        v-for="(record, index) in history"
        :key="index"
        class="history__record"
      >
        <span class="history__team">{{ teamNames[record.teamNumber] }}:</span>
        <span
          :class="[
            'history__points',
            record.points >= 0 ? 'success' : 'danger',
          ]"
        >
          {{ record.points }} {{ t('history.pts') }}
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.history {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
  max-width: 300px;
  width: 100%;
  max-height: 70vh;
  overflow: hidden;

  &__title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    color: var(--color-custom-title);
  }

  &__empty {
    font-size: var(--font-size-base);
    color: var(--color-text-muted);
    margin-top: var(--spacing-sm);
  }

  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: var(--spacing-sm);
    overflow-y: auto;
    max-height: 55vh;
    padding-bottom: var(--spacing-xl);
    min-width: 0;
  }

  &__record {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: var(--spacing-xs);
    border-bottom: 1px solid var(--color-border-default);
    font-size: var(--font-size-base);
    padding-right: var(--spacing-md);
    &:last-child {
      border-bottom: none;
    }
  }

  &__team {
    font-weight: 600;
    color: var(--color-custom-team-name);
  }

  &__points {
    font-weight: 700;
    &.success {
      color: var(--color-success-default);
    }
    &.danger {
      color: var(--color-danger-default);
    }
  }
}
</style>
