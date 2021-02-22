<template>
  <div class="flex gap-2 sm:gap-9">
    <div
      v-if="user"
      class="flex items-center gap-2"
    >
      <img class="rounded-full w-12" :src="user.photoURL" alt="User Avatar" />
      <span class="hidden sm:block">Olá, {{ firstName }}!</span>
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
import { useRouter } from 'vue-router'

export default {
  components: { AppButton },
  setup() {
    const router = useRouter()
    const {
      signIn,
      isAuthenticated,
      signOut,
      user,
    } = useAuth()

    const buttonText = computed(() => (isAuthenticated.value ? 'Sair' : 'Entrar'))
    const firstName = computed(() => user.value.displayName.split(' ')[0])

    const handleButtonClick = async () => {
      if (isAuthenticated.value) {
        await signOut()
        router.push({ path: '/' })
      } else {
        await signIn()
        router.push({ path: '/chat' })
      }
    }

    return {
      firstName,
      isAuthenticated,
      buttonText,
      handleButtonClick,
      user,
    }
  },
}
</script>
