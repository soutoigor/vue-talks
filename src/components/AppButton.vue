<template>
  <button
    class="bg-mediumPurple text-white font-bold py-2 px-4 rounded"
    :class="disabled && ['opacity-50', 'cursor-not-allowed']"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
