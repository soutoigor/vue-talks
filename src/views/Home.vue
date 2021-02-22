<template>
  <section class="flex flex-col justify-around md:flex-row w-full">
    <div class="flex flex-col items-center justify-center gap-10 md:gap-14 h-full pb-20">
      <h1 class="text-4xl md:text-6xl text-mediumPurple text-center">
        Converse online e grátis <br class="hidden md:block"> com a comunidade de
        <span class="text-white font-semibold">Vue</span>!
      </h1>
      <h2 class="text-xl text-center">
        Entre e comece a usar! :)
      </h2>
      <app-authentication />
    </div>
    <img
      class="hidden md:block self-end"
      src="@/assets/images/man-talking.png"
      alt="Man talking with notebook"
    />
    <img
      class="w-5/6 md:hidden"
      src="@/assets/images/women-talking.png"
      alt="Women talking with notebook"
    />
  </section>
</template>

<script>
import AppAuthentication from '@/components/AppAuthentication'

export default {
  components: {
    AppAuthentication,
  },
}
</script>
