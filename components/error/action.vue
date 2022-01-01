<template>
  <a
    role="button"
    :href="state !== 'disabled' ? href : null"
    :aria-disabled="state === 'disabled'"
    :disabled="state === 'disabled'"
    :class="[
      'transition relative overflow-hidden rounded-lg bg-current outline-current before:block before:absolute before:inset-0 before:transition',
      {
        'outline outline-offset-2 before:bg-black before:bg-opacity-0 before:hover:bg-opacity-10 before:active:bg-opacity-20 cursor-pointer mx-1': state === 'recommended',
        'before:bg-slate-100 before:bg-opacity-70 before:hover:bg-opacity-50 before:active:bg-opacity-30 cursor-pointer': state === 'default',
        'opacity-60 cursor-not-allowed': state === 'disabled'
      }
    ]"
    @click="handleClick"
  >
    <div :class="['relative flex px-3 py-2 flex-row space-x-1 pointer-events-none', { 'text-white': textColours && state === 'recommended', 'text-black': textColours && state !== 'recommended' }]">
      <slot name="icon" />
      <slot />
    </div>
  </a>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      default: 'default',
      validator (value) {
        return ['recommended', 'default', 'disabled'].includes(value)
      }
    },

    textColours: {
      type: Boolean,
      default: false
    },

    href: {
      type: String,
      default: null
    }
  },

  methods: {
    handleClick (event) {
      if (this.state === 'disabled') {
        return
      }

      this.$emit('click', event)
    }
  }
}
</script>
