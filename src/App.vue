<script lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
  },
})
</script>

<template>
  <div id="app">
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>
