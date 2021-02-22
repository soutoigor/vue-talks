<template>
  <input
    id="upload"
    class="absolute -left-96 opacity-0"
    name="upload"
    type="file"
    accept="image/*"
    capture
    @change="uploadImage"
  >
  <div
    v-if="fileSrc"
    class="flex items-center justify-center w-auto bg-gray-800 bg-opacity-40 rounded-md"
  >
    <button
      class="w-11 rounded-full cursor-pointer opacity-0 hover:opacity-100 bg-gray-700
       p-1 text-red-600 absolute bg-opacity-70 transition-all"
      @click="resetData"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5
           7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
    <img
      class="w-14 h-14 rounded"
      :src="fileSrc"
      @load="emitFile"
    />
  </div>
  <div
    v-else-if="shouldShowLoading"
    class="w-8 flex flex-col justify-center items-center text-white"
  >
    <svg
      class="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0
          0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
    <span>{{ progress }}%</span>
  </div>
  <label
    v-else
    for="upload"
    class="p-3 w-14 bg-transparent hover:bg-gray-700 rounded-full
      bg-opacity-30 text-white transition-all cursor-pointer"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2
        2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2
        2 0 00-2 2v12a2 2 0 002 2z"
    />
    </svg>
  </label>
</template>

<script>
import { useStorage } from '@/lib/firebase'
import { computed, watch } from 'vue'

export default {
  props: {
    file: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, { emit }) {
    const {
      upload,
      progress,
      fileSrc,
      resetData,
    } = useStorage()

    watch(
      () => props.file,
      (value) => {
        if (!value) resetData()
      },
    )

    const shouldShowLoading = computed(() => progress.value > 0 && progress.value < 100)

    const uploadImage = (event) => {
      const imageData = event.target.files[0]
      upload(imageData)
    }

    const emitFile = () => {
      emit('update:file', fileSrc.value)
    }

    return {
      fileSrc,
      resetData,
      progress,
      shouldShowLoading,
      uploadImage,
      emitFile,
    }
  },
}
</script>
