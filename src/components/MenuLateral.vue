<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'MenuLateral',
  props: {
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup({onClose}) {
    const { t } = useI18n();

    return {
      close: onClose,
      t,
    };
  },
});
</script>

<template>
  <div class="menu-lateral">
    <div class="menu-lateral__header">
      <button class="menu-lateral__close-button" @click="close()">
        ×
      </button>
      <h2 class="menu-lateral__title">Menú</h2>
    </div>
    <ul class="menu-lateral__list">
      <li class="menu-lateral__item">
        <router-link
          to="/"
          @click="close()"
          class="menu-lateral__link"
        >
          {{ t('menu.scoreboard') }}
        </router-link>
      </li>
      <li class="menu-lateral__item">
        <router-link
          to="/teams"
          @click="close()"
          class="menu-lateral__link"
        >
          {{ t('menu.teams') }}
        </router-link>
      </li>
      <li class="menu-lateral__item">
        <router-link
          to="/history"
          @click="close()"
          class="menu-lateral__link"
        >
          {{ t('menu.history') }}
        </router-link>
      </li>
      <li class="menu-lateral__item">
        <router-link
          to="/game-config"
          @click="close()"
          class="menu-lateral__link"
        >
          {{ t('menu.gameConfig') }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.menu-lateral {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: var(--white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0);
  width: 250px;
  &__header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--primary);
    color: var(--white);
  }
  &__close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 5px;
    margin-right: 10px;
    color: var(--white);
  }
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    color: var(--white);
  }
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &__item {
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
  }
  &__link {
    text-decoration: none;
    color: var(--text-color);
    font-size: 16px;
    display: block;
    transition: color 0.2s ease;
    &:hover {
      color: var(--primary);
      font-weight: bold;
    }
  }
}
</style>
