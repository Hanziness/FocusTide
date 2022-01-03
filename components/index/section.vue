<template functional>
  <div class="h-screen w-screen relative" :class="[data.class, data.staticClass]">
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
