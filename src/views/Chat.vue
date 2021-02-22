<template>
  <article class="flex p-10 gap-5 w-full h-full">
    <section class="w-1/4 section-cards">
      <rooms-list />
    </section>
    <section class="w-3/4 section-cards">
      <router-view :key="$route.params.id" />
    </section>
  </article>
</template>

<script>
import RoomsList from '@/components/RoomsList'

export default {
  components: {
    RoomsList,
  },
}
</script>

<style scoped>
.section-cards {
  @apply bg-gray-900 bg-opacity-70 rounded-lg shadow-xl p-5;
}
</style>
