<template>
  <div class="w-full h-full fixed bg-transparent overflow-hidden z-20 transition-colors duration-300" :style="{ 'background-color': `rgba(0, 0, 0, ${opacity})` }">
    <slot class="z-30" />
  </div>
</template>

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
