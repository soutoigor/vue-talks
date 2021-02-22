<template>
  <div class="min-h-screen bg-gray-800 text-white">
    <app-header />
    <main class="flex pt-20 flex-col justify-center items-center h-screen">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: {
    AppHeader,
  },
}
</script>
