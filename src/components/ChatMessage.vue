<template>
  <li
    class="flex px-4 py-2 hover:bg-gray-900 transition-all"
    :class="isUser && 'flex-row-reverse'"
  >
    <div
      class="flex gap-3"
      :class="isUser && 'flex-row-reverse'"
    >
      <img class="rounded-full h-10 md:h-14" :src="message.userPhotoUrl" />
      <div
        class="flex flex-col"
        :class="isUser && 'items-end'"
      >
        <div
          class="flex gap-2 items-center"
          :class="isUser && 'flex-row-reverse'"
        >
          <span
            class="text-gray-200 font-bold"
            :class="isUser && 'text-purple-500'"
          >
            {{ message.userName }}
          </span>
          -
          <span class="text-gray-500 text-xs md:text-sm">
            {{ formatMessageTime(message.createdAt) }}
          </span>
        </div>
        <div
          class="bg-gray-600 bg-opacity-40 rounded-lg py-1 px-3 mt-2 whitespace-pre-wrap"
          :class="isUser && 'bg-mediumPurple'"
        >
          <img
            v-if="message.attachmentUrl"
            :src="message.attachmentUrl"
            class="max-w-full md:max-w-5xl my-1"
          />
          {{ message.text }}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    isUser: {
      type: Boolean,
      required: false,
      default: false,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const formatMessageTime = (date) => `
      ${new Date(date).toLocaleDateString('pt-br')} ${new Date(date).toLocaleTimeString('pt-br')}
    `

    return {
      formatMessageTime,
    }
  },
}
</script>
