<template>
  <header class="flex justify-around items-center">
    <img src="@/assets/logo.png" alt="Vue Talks" />
    <app-authentication />
  </header>
</template>

<script>
import AppAuthentication from '@/components/AppAuthentication'

export default {
  components: {
    AppAuthentication,
  },
}
</script>
