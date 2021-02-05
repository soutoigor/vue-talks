<template>
  <app-button @click="handleButtonClick">
    {{ buttonText }}
  </app-button>
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
    }
  },
}
</script>
