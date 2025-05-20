<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ConfirmResetPopup from '@/components/ConfirmResetPopup.vue'

const props = defineProps<{
  onClose: () => void
}>()

const { t } = useI18n()

const menuItems = [
  { to: '/', label: t('menu.scoreboard') },
  { to: '/teams', label: t('menu.teams') },
  { to: '/history', label: t('menu.history') },
  { to: '/game-config', label: t('menu.gameConfig') },
]

const confirmResetPopupRef = ref<InstanceType<typeof ConfirmResetPopup> | null>(null);

const showResetConfirmation = () => {
  confirmResetPopupRef.value?.showPopup();
  props.onClose();
};
</script>

<template>
  <div class="menu-lateral" role="dialog" aria-label="Main menu">
    <div class="menu-lateral__header">
      <button
        class="menu-lateral__close-button"
        @click="props.onClose"
        aria-label="Close menu"
      >
        ×
      </button>
      <h2 class="menu-lateral__title">{{ t('menu.title') }}</h2>
    </div>
    <nav class="menu-lateral__nav">
      <ul class="menu-lateral__list">
        <li v-for="item in menuItems" :key="item.to" class="menu-lateral__item">
          <router-link
            :to="item.to"
            @click="props.onClose"
            class="menu-lateral__link"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="menu-lateral__actions">
      <button
        class="menu-lateral__reset-button"
        @click="showResetConfirmation"
      >
        {{ t('menu.reset') }}
      </button>
      
    </div>
  </div>


<ConfirmResetPopup ref="confirmResetPopupRef" />
</template>

<style scoped lang="scss">
.menu-lateral {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-surface, #fff);

  &__header {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: var(--color-primary, #1c1c2b);
    color: var(--color-on-primary, #fff);
  }

  &__close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
    color: inherit;

    &:hover {
      color: var(--color-accent, #ff9800);
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }

  &__nav {
    flex: 1;
    overflow-y: auto;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    border-bottom: 1px solid #eee;
  }

  &__link {
    display: block;
    padding: 1rem;
    font-size: 1rem;
    text-decoration: none;
    color: var(--color-text, #333);

    &:hover,
    &:focus {
      background-color: var(--color-primary, #1c1c2b);
      color: var(--color-on-primary, #fff);
      font-weight: bold;
    }
  }
}

.menu-lateral__actions {
  padding: 1rem;
  border-top: 1px solid #eee;
}

.menu-lateral__reset-button {
  width: 100%;
  padding: 1rem;
  background-color: #d32f2f;
  color: var(--color-white);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;

  &:hover {
  background-color: #b03232;
  }
}
</style>
