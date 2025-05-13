
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useTeamsStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import {  dimensions } from '@/config'; // Importa los colores y dimensiones

export default defineComponent({
  name: 'TeamConfig',
  setup() {
    const teamsStore = useTeamsStore();
    const { t } = useI18n();

    const team1Name = ref(teamsStore.team1Name);
    const team2Name = ref(teamsStore.team2Name);

    onMounted(() => {
      team1Name.value = teamsStore.team1Name;
      team2Name.value = teamsStore.team2Name;
    });

    const handleSaveNames = () => {
      teamsStore.setTeam1Name(team1Name.value);
      teamsStore.setTeam2Name(team2Name.value);
    };

    return {
      team1Name,
      team2Name,
      handleSaveNames,
      t,
      dimensions,
    };
  },
});
</script>

<template>
  <div class="team-config">
    <h2 class="team-config__title">{{ t('teamConfig.title') }}</h2>
    <div class="team-config__form">
      <div class="team-config__input-group">
        <label for="team1-name" class="team-config__label">{{ t('teamConfig.teamName') }} 1:</label>
        <input
          type="text"
          id="team1-name"
          v-model="team1Name"
          class="team-config__input"
          :style="{
            borderRadius: dimensions.borderRadius,
            padding: dimensions.inputPadding,
          }"
        />
      </div>
      <div class="team-config__input-group">
        <label for="team2-name" class="team-config__label">{{ t('teamConfig.teamName') }} 2:</label>
        <input
          type="text"
          id="team2-name"
          v-model="team2Name"
          class="team-config__input"
          :style="{
            borderRadius: dimensions.borderRadius,
            padding: dimensions.inputPadding,
          }"
        />
      </div>
      <button
        @click="handleSaveNames"
        class="team-config__save-button"
        :style="{
          color: '#fff',
          borderRadius: dimensions.borderRadius,
          padding: dimensions.buttonPadding,
        }"
      >
        {{ t('teamConfig.save') }}
      </button>
    </div>
  </div>
</template>


<style lang="scss">
.team-config {
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
    color: v(--title-color); // Usa el color del archivo de configuración
  }
  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  &__label {
    margin-bottom: 5px;
    font-weight: bold;
    color: v(--text-color);
  }
  &__input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  &__save-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    &:hover {
      background-color: #217dbb;
    }
  }
}
</style>
