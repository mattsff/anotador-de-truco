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

const confirmResetPopupRef = ref<InstanceType<typeof ConfirmResetPopup> | null>(
  null
)

const showResetConfirmation = () => {
  confirmResetPopupRef.value?.showPopup()
  props.onClose()
}
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
      <button class="menu-lateral__reset-button" @click="showResetConfirmation">
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
  background-color: var(--color-surface-default);

  &__header {
    display: flex;
    align-items: center;
    padding: var(--spacing-md);
    background-color: var(--color-primary-default);
    color: var(--color-primary-text);
  }

  &__close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
    color: inherit;

    &:hover {
      color: var(--color-secondary-default);
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__title {
    font-size: var(--font-size-lg);
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
    border-bottom: 0.5px solid var(--color-border-light);
  }

  &__link {
    display: block;
    padding: var(--spacing-md);
    font-size: var(--font-size-md);
    text-decoration: none;
    color: var(--color-text-base);

    &:hover,
    &:focus {
      background-color: var(--color-primary-hover);
      color: var(--color-primary-text);
      font-weight: bold;
    }
  }

  &__actions {
    padding: var(--spacing-md);
  }

  &__reset-button {
    width: 100%;
    padding: var(--spacing-md);
    background-color: var(--color-danger-default);
    color: var(--color-danger-text);
    border: none;
    font-size: var(--font-size-md);
    cursor: pointer;
    text-align: center;

    &:hover {
      background-color: var(--color-danger-hover);
    }
  }
}
</style>
