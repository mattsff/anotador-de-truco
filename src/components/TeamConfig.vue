<script setup lang="ts">
import { ref } from 'vue';
import { useTeamsStore } from '@/stores';
import { useI18n } from 'vue-i18n';

const teamsStore = useTeamsStore();
const { t } = useI18n();

const team1Name = ref(teamsStore.team1Name);
const team2Name = ref(teamsStore.team2Name);

const handleSaveNames = () => {
  teamsStore.setTeam1Name(team1Name.value.trim());
  teamsStore.setTeam2Name(team2Name.value.trim());
};
</script>

<template>
  <section class="team-config">
    <h2 class="team-config__title">{{ t('teamConfig.title') }}</h2>

    <form class="team-config__form" @submit.prevent="handleSaveNames">
      <fieldset class="team-config__fieldset">
        <div class="team-config__input-group">
          <label for="team1-name" class="team-config__label">{{ t('teamConfig.teamName') }} 1:</label>
          <input
            id="team1-name"
            type="text"
            v-model="team1Name"
            class="team-config__input"
          />
        </div>

        <div class="team-config__input-group">
          <label for="team2-name" class="team-config__label">{{ t('teamConfig.teamName') }} 2:</label>
          <input
            id="team2-name"
            type="text"
            v-model="team2Name"
            class="team-config__input"
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
  padding: var(--spacing-lg, 1.5rem);
  border-radius: var(--border-radius, 12px);
  background-color: var(--color-surface, #fff);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-lg, 1.5rem);
  max-width: 400px;

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--title-color, #333);
  }

  &__form {
    width: 100%;
  }

  &__fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  &__legend {
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary, #333);
    font-size: 1.125rem;
  }

  &__input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  &__label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-primary, #333);
  }

  &__input {
    padding: var(--input-padding, 0.75rem);
    border: 1px solid var(--border-color, #ccc);
    border-radius: var(--border-radius, 8px);
    font-size: 1rem;
  }

  &__save-button {
    display: block;
    width: 100%;
    padding: var(--button-padding, 0.75rem);
    background-color: var(--primary, #3498db);
    color: #fff;
    border: none;
    border-radius: var(--border-radius, 8px);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--primary-dark, #217dbb);
    }
  }
}
</style>