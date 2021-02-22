<template>
  <article
    class="flex items-center justify-center flex-col
    bg-gray-600 rounded-md bg-opacity-60 h-full gap-7"
  >
    <h1 class="text-3xl">
      Bem vindo ao <strong class="text-mediumPurple">Vue Talks</strong>! 🤟
    </h1>
    <h2 class="text-2xl">
       👈 Selecione ou crie uma sala ao lado para começar a conversar
    </h2>
    <img
      class="inverted-image"
      src="@/assets/images/women-talking.png"
      alt="Mulheres conversando"
    >
  </article>
</template>

<style scoped>
.inverted-image {
  transform: scaleX(-1);
  @apply absolute bottom-20 right-20 h-64;
}
</style>
