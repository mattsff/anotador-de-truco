<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { dimensions } from '@/config';

export default defineComponent({
  name: 'ConfirmationPopup',
  setup() {
    const { t } = useI18n();
    const show = ref(false);
    const onConfirmCallback = ref<() => void>(() => {});

    const showPopup = (callback: () => void) => {
      onConfirmCallback.value = callback;
      show.value = true;
    };

    const confirm = () => {
      onConfirmCallback.value();
      show.value = false;
    };

    const cancel = () => {
      show.value = false;
    };

    return {
      show,
      showPopup,
      confirm,
      cancel,
      t,
      dimensions,
    };
  },
});
</script>

<template>
  <div v-if="show" class="confirmation-popup">
    <div class="confirmation-popup__content" :style="{
        backgroundColor: '#fff',
        borderRadius: dimensions.borderRadius,
        padding: dimensions.popupPadding,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        width: dimensions.popupWidth,
        maxWidth: '90%'
    }">
      <h2 class="confirmation-popup__title">
        {{ t('confirmationPopup.title') }}
      </h2>
      <p class="confirmation-popup__message">
        {{ t('confirmationPopup.message') }}
      </p>
      <div class="confirmation-popup__buttons">
        <button
          @click="confirm"
          class="confirmation-popup__button confirmation-popup__confirm"
          :style="{
            color: '#fff',
            borderRadius: dimensions.borderRadius,
            padding: dimensions.buttonPadding,
            marginRight: dimensions.buttonMargin,
      
          }"
        >
          {{ t('confirmationPopup.confirm') }}
        </button>
        <button
          @click="cancel"
          class="confirmation-popup__button confirmation-popup__cancel"
          :style="{
            color: '#fff',
            borderRadius: dimensions.borderRadius,
            padding: dimensions.buttonPadding,
          }"
        >
          {{ t('confirmationPopup.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
  z-index: 10;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
  }
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: v(--title-color);
  }
  &__message {
    font-size: 18px;
    margin-bottom: 20px;
    color: v(--text-color);
  }
  &__buttons {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__button {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 10px;
    flex: 1;
    text-align: center;
  }
  &__confirm {
    background-color: v(--danger);
    &:hover {
      background-color: v(--danger-hover);
    }
  }
  &__cancel {
    background-color: v(--secondary);
    &:hover {
      background-color: v(--secondary-hover);
    }
  }
}
</style>
