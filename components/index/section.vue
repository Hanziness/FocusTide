<template>
  <div class="relative w-screen">
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
