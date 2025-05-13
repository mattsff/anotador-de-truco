<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGameStore } from '@/stores';
import {  dimensions } from '@/config';
import ConfirmationPopup from '@/components/ConfirmationPopup.vue';
import MenuLateral from '@/components/MenuLateral.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    ConfirmationPopup,
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
      <h1 class="main-layout__title" :style="{ color: '#fff' }">{{ t('app.title') }}</h1>
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
      <VictoryAnimation v-if="gameStore.gameEnded" :winningTeam="gameStore.winningTeam" />
    </main>

    <footer class="main-layout__footer">
      <button
        class="main-layout__reset-button"
        @click="showResetConfirmation"
        :style="{
          color: '#fff',
          borderRadius: dimensions.borderRadius,
          padding: dimensions.buttonPadding
        }"
      >
        {{ t('menu.reset') }}
      </button>
    </footer>

    <ConfirmationPopup ref="confirmationPopupRef" />
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
    justify-content: space-between;
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
    margin: 0;
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
