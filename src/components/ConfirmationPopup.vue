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
        <h2 class="confirmation-popup__title">{{ t('confirmationPopup.title') }}</h2>
        <p class="confirmation-popup__message">{{ t('confirmationPopup.message') }}</p>
        <div class="confirmation-popup__buttons">
          <button @click="confirm" class="confirmation-popup__button confirmation-popup__confirm">
            {{ t('confirmationPopup.confirm') }}
          </button>
          <button @click="cancel" class="confirmation-popup__button confirmation-popup__cancel">
            {{ t('confirmationPopup.cancel') }}
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--popup-padding, 2rem);
    border-radius: var(--border-radius, 12px);
    background-color: var(--color-surface, #fff);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: var(--popup-width, 320px);
    max-width: 90%;
    margin: 10%;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--title-color, #333);
  }

  &__message {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: var(--text-color, #555);
  }

  &__buttons {
    display: flex;
    width: 100%;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__button {
    flex: 1 1 40%;
    padding: var(--button-padding, 0.75rem 1.5rem);
    border: none;
    border-radius: var(--button-border-radius, 8px);
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    color: var(--on-primary, #fff);
    text-align: center;
  }

  &__confirm {
    background-color: var(--danger, #e53935);

    &:hover {
      background-color: var(--danger-hover, #b71c1c);
    }
  }

  &__cancel {
    background-color: var(--secondary, #757575);

    &:hover {
      background-color: var(--secondary-hover, #424242);
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