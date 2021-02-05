<template>
  <app-header />
  <main class="flex flex-col justify-center items-center h-screen">
    <chat-container v-if="isAuthenticated" />
    <app-presentation v-else />
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppPresentation from '@/components/AppPresentation'
import ChatContainer from '@/components/ChatContainer'
import { useAuth } from '@/lib/firebase'

export default {
  components: {
    AppHeader,
    AppPresentation,
    ChatContainer,
  },
  setup() {
    const { isAuthenticated } = useAuth()

    return { isAuthenticated }
  },
}
</script>
