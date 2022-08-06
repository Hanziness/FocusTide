<template>
  <div class="fixed z-20 w-full h-full overflow-hidden transition-colors duration-300 before:bg-black before:bg-opacity-60 before:absolute before:left-0 before:w-full before:h-full before:transition-all">
    <slot class="z-30" />
  </div>
</template>

<script>
export default {
}
</script>
