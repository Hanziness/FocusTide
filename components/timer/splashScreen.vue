<template>
  <div class="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gray-800">
    <div class="flex flex-row space-x-4">
      <div class="w-8 h-8 rounded-full bg-work flashing anim-timing" />
      <div class="w-8 h-8 rounded-full bg-shortpause flashing anim-delay-1 anim-timing" />
      <div class="w-8 h-8 rounded-full bg-longpause flashing anim-delay-2 anim-timing" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.flashing {
  animation-name: flash;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
  animation-iteration-count: infinite;
}

.anim-timing {
  animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
}

.anim-delay-1 {
  animation-delay: 300ms;
}

.anim-delay-2 {
  animation-delay: 600ms;
}

@keyframes flash {
  0% {
    opacity: 1
  }

  10% {
    opacity: 0.6
  }

  20% {
    opacity: 0.6;
  }

  30% {
    opacity: 1
  }
}
</style>
