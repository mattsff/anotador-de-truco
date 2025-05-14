<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGameStore } from '@/stores';
import {  dimensions } from '@/config';
import ConfirmationPopup from '@/components/ConfirmationPopup.vue';
import MenuLateral from '@/components/MenuLateral.vue';
import VictoryAnimation from '@/components/VictoryAnimation.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    ConfirmationPopup,
    VictoryAnimation,
    MenuLateral,
  },
  setup() {
    const { t } = useI18n();
    const gameStore = useGameStore();
    const confirmationPopupRef = ref<InstanceType<typeof ConfirmationPopup> | null>(null);
    const isMenuOpen = ref(false);

    const showResetConfirmation = () => {
      if (confirmationPopupRef.value) {
        confirmationPopupRef.value.showPopup(() => {
          gameStore.resetGame();
        });
      }
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    return {
      t,
      gameStore,
      confirmationPopupRef,
      showResetConfirmation,
      isMenuOpen,
      closeMenu,
      dimensions,
    };
  },
});
</script>

<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <button class="main-layout__menu-button" @click="isMenuOpen = true" :style="{ color: '#fff' }">
        ☰
      </button>
      <h1 class="main-layout__title">{{ t('app.title') }}</h1>
    </header>

    <MenuLateral
      v-if="isMenuOpen"
      @close="closeMenu"
      :style="{
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        width: dimensions.menuWidth,
      }"
    />

    <main class="main-layout__content">
      <slot />
       <button
        class="main-layout__reset-button"
        @click="showResetConfirmation"
      >
        {{ t('menu.reset') }}
      </button>
      
      <ConfirmationPopup ref="confirmationPopupRef" />
      <VictoryAnimation v-if="gameStore.gameEnded" :winningTeam="gameStore.winningTeam" />
    </main>

    <footer class="app-footer">
      <span>Desarrollado por 
        <a href="https://www.linkedin.com/in/matias-sieff/" target="_blank" rel="noopener" aria-label="LinkedIn">
        Matías Sieff
      </a>
      </span>
      |
      <a href="https://github.com/mattsff" target="_blank" rel="noopener" aria-label="GitHub">
        GitHub
      </a>
    </footer>
  </div>
</template>

<style lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: white;
  }
  &__menu-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 5px;
  }
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin: 0px 10px;
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
  }
  &__footer {
    display: flex;
    justify-content: center;
    padding: 10px 20px;
  }
  &__reset-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #c0392b;
    }
  }
}
</style>
