<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGameStore } from '@/stores';
import ConfirmationPopup from '@/components/ConfirmationPopup.vue';
import MenuLateral from '@/components/MenuLateral.vue';
import VictoryAnimation from '@/components/VictoryAnimation.vue';

const gameStore = useGameStore();
const { t } = useI18n();

const confirmationPopupRef = ref<InstanceType<typeof ConfirmationPopup> | null>(null);
const isMenuOpen = ref(false);

const showResetConfirmation = () => {
  confirmationPopupRef.value?.showPopup(() => {
    gameStore.resetGame();
    isMenuOpen.value = false;
  });
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div class="main-layout">
    <!-- Sidebar fixed in desktop, toggle in mobile -->
    <aside
      class="main-layout__sidebar"
      :class="{ 'main-layout__sidebar--open': isMenuOpen }"
    >
      <MenuLateral @close="closeMenu" />
    </aside>

    <!-- Overlay in mobile when menu is open -->
    <div
      class="main-layout__overlay"
      v-if="isMenuOpen"
      @click="closeMenu"
    ></div>

    <div class="main-layout__main">
      <header class="main-layout__header">
        <button
          class="main-layout__menu-button"
          @click="toggleMenu"
          :aria-label="t('menu.open')"
        >
          ☰
        </button>
        <h1 class="main-layout__title">{{ t('app.title') }}</h1>
      </header>

      <main class="main-layout__content">
        <slot />
        <VictoryAnimation
          v-if="gameStore.gameEnded"
          :winningTeam="gameStore.winningTeam"
        />
      </main>

      <footer class="main-layout__footer">
        <span>
            Desarrollado por
            <a href="https://www.linkedin.com/in/sieffmatias/" target="_blank" rel="noopener">
              Matías Sieff
            </a>
          |
          <a href="https://github.com/mattsff" target="_blank" rel="noopener">
            GitHub
          </a>
        </span>
      </footer>
    </div>

    <ConfirmationPopup ref="confirmationPopupRef" />
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  display: flex;
  height: 100vh;
  width: 100%;

  &__sidebar {
    background-color: #fff;
    width: 250px;
    position: fixed;
    top: 0;
    left: -250px;
    height: 100%;
    z-index: 800;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease-in-out;

    &--open {
      left: 0;
    }

    @media (min-width: 768px) {
      position: static;
      left: 0;
      box-shadow: none;
      width: 250px;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 700;

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 0;
    background-color: #f5f5f5;

    @media (min-width: 768px) {
      margin-left: 250px;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #2d4263;
    color: white;

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__menu-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
  }

  &__title {
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  &__content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }

  &__footer {
    background-color: #2d4263;
    border-top: 3px solid #ecdbba;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    font-size: 0.9rem;
    color: white;

    a {
      color: #ecdbba;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>