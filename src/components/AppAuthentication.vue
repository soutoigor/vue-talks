<template>
  <div class="flex gap-2 sm:gap-9">
    <div
      v-if="user"
      class="flex items-center gap-2"
    >
      <img class="rounded-full w-12" :src="user.photoURL" alt="User Avatar" />
      <span class="hidden sm:block">Olá, {{ user.displayName.split(' ')[0] }}!</span>
    </div>
    <app-button @click="handleButtonClick">
      {{ buttonText }}
    </app-button>
  </div>
</template>

<script>
import { useAuth } from '@/lib/firebase'
import { computed } from 'vue'
import AppButton from '@/components/AppButton'

export default {
  components: { AppButton },
  setup() {
    const {
      signIn,
      isAuthenticated,
      signOut,
      user,
    } = useAuth()

    const buttonText = computed(() => (isAuthenticated.value ? 'Sair' : 'Entrar'))

    const handleButtonClick = () => {
      if (isAuthenticated.value) {
        signOut()
      } else {
        signIn()
      }
    }

    return {
      isAuthenticated,
      buttonText,
      handleButtonClick,
      user,
    }
  },
}
</script>
