<template>
  <div class="ui-overlay" :style="{ 'background-color': `rgba(0, 0, 0, ${opacity})` }">
    <slot class="ui-overlay-contents" />
  </div>
</template>

<style lang="scss" scoped>
div.ui-overlay {
  @apply w-full h-full fixed bg-transparent overflow-hidden;

  z-index: 1000;
  transition: background-color 300ms ease-out;
}

.ui-overlay-contents {
  z-index: 1001;
}
</style>

<script>
export default {
  props: {
    opacity: {
      type: Number,
      default: 0.3,
      validator (value) { return value >= 0 && value <= 1 }
    }
  }
}
</script>
