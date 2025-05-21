<script setup lang="ts">
import { ref } from 'vue'
import { useTeamsStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const teamsStore = useTeamsStore()
const { t } = useI18n()

const team1Name = ref(teamsStore.team1Name)
const team2Name = ref(teamsStore.team2Name)

const handleSaveNames = () => {
  teamsStore.setTeam1Name(team1Name.value.trim())
  teamsStore.setTeam2Name(team2Name.value.trim())
}
</script>

<template>
  <section class="team-config">
    <h2 class="team-config__title">{{ t('teamConfig.title') }}</h2>

    <form class="team-config__form" @submit.prevent="handleSaveNames">
      <fieldset class="team-config__fieldset">
        <div class="team-config__input-group">
          <label for="team1-name" class="team-config__label"
            >{{ t('teamConfig.teamName') }} 1:</label
          >
          <input
            id="team1-name"
            type="text"
            v-model="team1Name"
            class="team-config__input"
            maxlength="12"
          />
        </div>

        <div class="team-config__input-group">
          <label for="team2-name" class="team-config__label"
            >{{ t('teamConfig.teamName') }} 2:</label
          >
          <input
            id="team2-name"
            type="text"
            v-model="team2Name"
            class="team-config__input"
            maxlength="12"
          />
        </div>

        <button type="submit" class="team-config__save-button">
          {{ t('teamConfig.save') }}
        </button>
      </fieldset>
    </form>
  </section>
</template>

<style scoped lang="scss">
.team-config {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
  max-width: 400px;

  &__title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    color: var(--color-custom-title);
  }

  &__form {
    width: 100%;
  }

  &__fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  &__input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-md);
  }

  &__label {
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
    color: var(--color-text-base);
  }

  &__input {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    background-color: var(--color-surface-inverse);
  }

  &__save-button {
    display: block;
    width: 100%;
    padding: var(--spacing-sm);
    background-color: var(--color-primary-default);
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--color-primary-hover);
    }
  }
}
</style>
