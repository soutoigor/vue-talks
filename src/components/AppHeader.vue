<template>
  <header
    class="flex justify-between items-center py-3 px-2 sm:px-12 md:px-24 bg-gray-700 shadow-sm"
  >
    <img
      class="h-16 sm:h-28"
      src="@/assets/logo.png"
      alt="Vue Talks"
    />
    <ul class="hidden lg:flex justify-evenly items-center w-2/3">
      <li
        v-for="(link, index) of links"
        :key="index"
        class="hover:text-mediumPurple hover:underline transform hover:scale-105 hover:text-purple"
      >
        <a href="#">{{ link }}</a>
      </li>
    </ul>
    <app-authentication />
  </header>
</template>

<script>
import AppAuthentication from '@/components/AppAuthentication'

export default {
  components: {
    AppAuthentication,
  },
  setup() {
    return {
      links: [
        'Baixe o aplicativo',
        'Contato',
        'Sobre',
      ],
    }
  },
}
</script>
