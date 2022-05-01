<template functional>
  <div :ref="data.ref" class="relative w-screen" :class="[data.class, data.staticClass]">
    <slot name="before" />
    <slot />
    <slot name="after" />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$emit('mounted')
  }
}
</script>
