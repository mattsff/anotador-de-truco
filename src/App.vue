<script lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
  },
  setup() {
    let wakeLock: any = null

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen')
        }
      } catch (err) {
        // Wake Lock not supported
      }
    }

    onMounted(() => {
      requestWakeLock()
      document.addEventListener('visibilitychange', requestWakeLock)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('visibilitychange', requestWakeLock)
      if (wakeLock && wakeLock.release) {
        wakeLock.release()
      }
    })
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
