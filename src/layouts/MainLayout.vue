<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MenuLateral from '@/components/MenuLateral.vue'

const { t } = useI18n()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
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
      </main>

      <footer class="main-layout__footer">
        <span>
          Desarrollado por
          <a
            href="https://www.linkedin.com/in/sieffmatias/"
            target="_blank"
            rel="noopener"
          >
            Matías Sieff
          </a>
          |
          <a href="https://github.com/mattsff" target="_blank" rel="noopener">
            GitHub
          </a>
        </span>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  background: var(--color-background-inverse);

  &__sidebar {
    background: var(--color-surface-inverse);
    width: 260px;
    position: fixed;
    top: 0;
    left: -261px;
    height: 100vh;
    z-index: 800;
    box-shadow: 2px 0 16px 0 rgba(0, 0, 0, 0.45);
    border-right: 1px solid var(--color-border-strong);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &--open {
      left: 0;
    }

    @media (min-width: 768px) {
      position: static;
      left: 0;
      box-shadow: none;
      width: 260px;
      height: 100vh;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(20, 20, 30, 0.7);
    z-index: 700;

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin-left: 0;
    background: var(--color-background-inverse);
  }

  &__header {
    display: flex;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-sm);
    background: var(--color-surface-inverse);
    color: var(--color-text-inverse);
    border-bottom: 1px solid var(--color-border-light);

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__menu-button {
    background: none;
    border: none;
    font-size: var(--font-size-md);
    cursor: pointer;
    color: var(--color-text-inverse);
    margin-right: 10px;
    transition: color 0.2s;

    &:hover {
      color: var(--color-primary-default);
    }
  }

  &__title {
    font-size: var(--font-size-md);
    font-weight: bold;
    margin: 0;
    letter-spacing: 1px;
    color: var(--color-text-inverse);
  }

  &__content {
    flex: 1;
    padding: var(--spacing-xl) var(--spacing-md);
    overflow-y: auto;
    background: var(--color-background-inverse);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__footer {
    background: var(--color-surface-inverse);
    border-top: 1px solid var(--color-border-light);
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: var(--spacing-md) 0;
    font-size: 0.95rem;
    color: var(--color-text-inverse);

    a {
      color: var(--color-primary-default);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: var(--color-primary-hover);
      }
    }
  }
}
</style>
