<template>
  <input
    type="text"
    class="bg-mediumPurple px-4 py-6 outline-none focus:shadow-lg transition-shadow
      rounded h-11 w-full bg-opacity-10 text-sm"
    :placeholder="placeholder"
    :value="text"
    @input="$emit('update:text', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
