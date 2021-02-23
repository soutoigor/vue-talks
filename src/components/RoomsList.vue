<template>
  <transition-group name="slide" tag="header">
    <div
      v-if="!isShowingCreate"
      class="flex gap-4 slide-item"
    >
      <text-field
        class="w-4/5"
        v-model:text="searchRoom"
        placeholder="Buscar salas"
      />
      <app-button
        class="w-16"
        @click="showCreateRoom"
      >
        <!-- https://heroicons.com/ -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0
             110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </app-button>
    </div>
    <create-room
      v-if="isShowingCreate"
      class="slide-item"
      @closed="hideCreateRoom"
    />
  </transition-group>
  <div class="h-0.5 my-6 bg-white bg-opacity-20 rounded" />
  <main class="h-5/6">
    <h3
      v-if="isEmptyRooms"
      class="text-center"
    >
      Sala não encontrada 🧐
    </h3>
    <transition-group
      name="slide"
      tag="ul"
      class="max-h-full overflow-y-auto"
    >
      <li
        v-for="room of filteredRooms"
        :key="room.id"
        class="cursor-pointer bg-gray-900 rounded-md my-2 h-16 shadow-sm opacity-40
        hover:opacity-70 transition-all flex justify-between items-center px-6 py-4 slide-item"
        :class="isActiveRoom(room.id) && ['opacity-100', 'transition-opacity']"
        @click="setRoom(room.id)"
      >
        <span>{{ room.name }}</span>
        <span class="w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        </span>
      </li>
    </transition-group>
  </main>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TextField from '@/components/TextField'
import CreateRoom from '@/components/CreateRoom'
import { useRoom } from '@/lib/firebase'
import AppButton from '@/components/AppButton'

export default {
  components: {
    TextField,
    CreateRoom,
    AppButton,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { rooms } = useRoom()

    const searchRoom = ref('')
    const isShowingCreate = ref(false)

    const isActiveRoom = (roomId) => roomId === route.params.id

    const setRoom = (id) => router.push(`/chat/${id}`)

    const filteredRooms = computed(
      () => (searchRoom.value.length >= 2
        ? rooms.value.filter(({ name }) => name
          .toLowerCase()
          .includes(searchRoom.value.toLowerCase()))
        : rooms.value),
    )

    const isEmptyRooms = computed(() => filteredRooms.value.length === 0)

    const showCreateRoom = () => {
      isShowingCreate.value = true
    }

    const hideCreateRoom = () => {
      isShowingCreate.value = false
    }

    return {
      isShowingCreate,
      showCreateRoom,
      hideCreateRoom,
      isEmptyRooms,
      setRoom,
      searchRoom,
      isActiveRoom,
      filteredRooms,
    }
  },
}
</script>

<style scoped>
.slide-item {
  transition: all .6s;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-leave-active {
  position: absolute;
}
</style>
