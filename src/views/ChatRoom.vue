<template>
  <article
    class="flex flex-col justify-between h-full w-full"
  >
    <header
      class="flex items-center justify-between
       bg-mediumPurple bg-opacity-10 px-5 py-3 z-10 shadow-md"
    >
      <h1 class="text-lg font-semibold">
        {{ room.name }}
      </h1>
      <small class="text-gray-500">Mensagens: {{ messages.length }}</small>
    </header>
    <main
      class="flex flex-col justify-end flex-1 gap-6 h-3/4 mb-6"
    >
      <h3
        v-if="isMessagesEmpty"
        class="text-center mt-10"
      >
        Não há mensagens nesta conversa ainda 😶
      </h3>
      <ul class="max-h-full overflow-y-auto">
        <chat-message
          v-for="message of messages"
          :key="message.id"
          :message="message"
          :is-user="isMessageFromUser(message.userId)"
        />
        <div ref="bottom" />
      </ul>
    </main>
    <create-message
      v-if="room.id"
      :room-id="room.id"
    />
  </article>
</template>

<script>
import {
  ref,
  onMounted,
  watch,
  computed,
  nextTick,
} from 'vue'
import { useMessage, useAuth, useRoom } from '@/lib/firebase'
import { useRoute } from 'vue-router'
import CreateMessage from '@/components/CreateMessage'
import ChatMessage from '@/components/ChatMessage'

export default {
  components: {
    CreateMessage,
    ChatMessage,
  },
  setup() {
    const route = useRoute()
    const { messages } = useMessage(route.params.id)
    const { getRoomById } = useRoom()
    const { user } = useAuth()

    const room = ref({})
    const bottom = ref(null)

    const setRoomData = async () => {
      room.value = await getRoomById(route.params.id)
    }

    onMounted(() => setRoomData())

    watch(() => route.params.id, setRoomData)

    watch(
      messages,
      () => {
        nextTick(() => bottom.value?.scrollIntoView({ behavior: 'smooth' }))
      },
      { deep: true },
    )

    const isMessagesEmpty = computed(() => messages.value.length === 0)

    const isMessageFromUser = (userId) => userId === user.value.uid

    return {
      bottom,
      room,
      messages,
      isMessageFromUser,
      isMessagesEmpty,
    }
  },
}
</script>
