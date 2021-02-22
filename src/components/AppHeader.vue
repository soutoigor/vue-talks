<template>
  <header
    class="flex fixed justify-between w-full
    h-20 items-center px-2 sm:px-12 md:px-24 bg-opacity-70 bg-gray-900 shadow-md"
  >
    <img
      class="h-16 sm:h-16"
      src="@/assets/images/logo.png"
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
