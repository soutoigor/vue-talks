<template>
  <article
    v-if="isInMobile"
    class="flex md:hidden w-full h-full py-6 px-2"
  >
    <section class="w-screen section-cards">
      <router-view v-if="shouldShowChat" />
      <rooms-list v-else />
    </section>
  </article>
  <article
    v-else
    class="hidden md:flex p-10 gap-5 w-full h-full"
  >
    <section
      class="w-screen md:w-1/4 section-cards"
    >
      <rooms-list />
    </section>
    <section
      class="w-screen md:w-3/4 section-cards"
    >
      <router-view :key="$route.params.id" />
    </section>
  </article>
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
} from 'vue'
import { useRoute } from 'vue-router'
import RoomsList from '@/components/RoomsList'

export default {
  components: { RoomsList },
  setup() {
    const route = useRoute()
    const windowSize = ref(0)

    const setWindowSize = () => {
      windowSize.value = window.innerWidth
    }

    onMounted(() => window.addEventListener('resize', setWindowSize))
    onUnmounted(() => window.removeEventListener('resize', setWindowSize))

    const shouldShowChat = computed(() => !!route.params.id)
    const isInMobile = computed(() => windowSize.value < 768)

    return {
      isInMobile,
      shouldShowChat,
    }
  },
}
</script>

<style scoped>
.section-cards {
  @apply bg-gray-900 bg-opacity-70 rounded-lg shadow-xl p-2 md:p-5;
}
</style>
