<template>
  <div class="h-screen w-screen relative">
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
