<template>
  <form
    class="flex gap-4"
    @submit.prevent="createMessage"
  >
    <text-field
      v-model:text="messageText"
      placeholder="Nova mensagem"
      class="flex-1"
    />
    <image-upload
      v-model:file="attachmentUrl"
    />
    <app-button
      type="submit"
      class="w-16 h-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-7 ml-1 -mt-1 transform rotate-45"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    </app-button>
  </form>
</template>

<script>
import TextField from '@/components/TextField'
import AppButton from '@/components/AppButton'
import ImageUpload from '@/components/ImageUpload'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMessage } from '@/lib/firebase'

export default {
  components: {
    TextField,
    AppButton,
    ImageUpload,
  },
  setup() {
    const route = useRoute()
    const { sendMessage } = useMessage(route.params.id)

    const messageText = ref('')
    const attachmentUrl = ref(null)

    const createMessage = () => {
      if (messageText.value.length > 0 || attachmentUrl.value) {
        sendMessage({
          text: messageText.value,
          attachmentUrl: attachmentUrl.value || null,
        })
        attachmentUrl.value = null
        messageText.value = ''
      }
    }

    return {
      messageText,
      createMessage,
      attachmentUrl,
    }
  },
}
</script>
