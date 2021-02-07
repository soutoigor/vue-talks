<template>
  <button
    class="bg-mediumPurple text-white font-bold py-2 px-4 rounded"
    :class="$props.disabled && ['opacity-50', 'cursor-not-allowed']"
    :disabled="$props.disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
