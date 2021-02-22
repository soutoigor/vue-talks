<template>
  <form
    class="flex gap-4"
    @submit.prevent="createNewRoom"
  >
    <text-field
      v-model:text="roomName"
      placeholder="Nome da nova sala"
      v-focus
      @blur="emitClose"
    />
    <app-button
      type="submit"
      class="w-16"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24" stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2" d="M5 13l4 4L19 7"
        />
      </svg>
    </app-button>
  </form>
</template>

<script>
import AppButton from '@/components/AppButton'
import { ref } from 'vue'
import TextField from '@/components/TextField'
import { useRoom } from '@/lib/firebase'

export default {
  components: {
    AppButton,
    TextField,
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      },
    },
  },
  setup(_, { emit }) {
    const { createRoom } = useRoom()

    const roomName = ref('')

    const emitClose = () => {
      setTimeout(() => emit('closed'), 200)
    }

    const createNewRoom = () => {
      if (roomName.value.length === 0) return
      createRoom(roomName.value)
      emitClose()
    }

    return {
      emitClose,
      roomName,
      createNewRoom,
    }
  },
}
</script>
