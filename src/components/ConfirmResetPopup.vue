<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGameStore } from '@/stores';

const { t } = useI18n();
const gameStore = useGameStore();

const show = ref(false);

const showPopup = () => {
  show.value = true;
};

const confirm = () => {
  show.value = false;
  gameStore.resetGame();
};

const cancel = () => {
  show.value = false;
};

defineExpose({ showPopup });
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="confirmation-popup" role="dialog" aria-modal="true" aria-label="Confirmation popup">
      <div class="confirmation-popup__content">
        <h2 class="confirmation-popup__title">{{ t('confirmResetPopup.title') }}</h2>
        <p class="confirmation-popup__message">{{ t('confirmResetPopup.message') }}</p>
        <div class="confirmation-popup__buttons">
          <button @click="confirm" class="confirmation-popup__button confirmation-popup__confirm">
            {{ t('confirmResetPopup.confirm') }}
          </button>
          <button @click="cancel" class="confirmation-popup__button confirmation-popup__cancel">
            {{ t('confirmResetPopup.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.confirmation-popup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-inverse);
  z-index: 1000;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface-default);
    box-shadow: 0 var(--spacing-sm) var(--spacing-lg) rgba(0, 0, 0, 0.2);
    width: 320px;
    max-width: 90%;
    margin: 10%;
  }

  &__title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-sm);
    color: var(--color-custom-title);
  }

  &__message {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-base);
  }

  &__buttons {
    display: flex;
    width: 100%;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    justify-content: center;
  }

  &__button {
    flex: 1 1 40%;
    padding: var(--spacing-sm);
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    color: var(--color-surface-default);
    text-align: center;
  }

  &__confirm {
    background-color: var(--color-danger-default);

    &:hover {
      background-color: var(--color-danger-hover);
    }
  }

  &__cancel {
    background-color: var(--color-secondary-default);

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
