<script lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
  },
});
</script>

<template>
  <div id="app">
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
