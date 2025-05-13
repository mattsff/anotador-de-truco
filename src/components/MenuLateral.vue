<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  onClose: () => void;
}>();

const { t } = useI18n();
const menuItems = [
  { to: '/', label: t('menu.scoreboard') },
  { to: '/teams', label: t('menu.teams') },
  { to: '/history', label: t('menu.history') },
  { to: '/game-config', label: t('menu.gameConfig') },
];

</script>

<template>
  <aside class="menu-lateral" role="dialog" aria-label="Main menu">
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
  </aside>
</template>

<style scoped lang="scss">
.menu-lateral {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: var(--color-surface, #fff);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;

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
    transition: background-color 0.2s, color 0.2s;

    &:hover,
    &:focus {
      background-color: var(--color-primary, #1c1c2b);
      color: var(--color-on-primary, #fff);
      font-weight: bold;
    }
  }
}
</style>