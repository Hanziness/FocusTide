<template>
  <div>
    {{ $dayjs.formatRelative($store.state.timer.timerRemaining) }}
  </div>
</template>

<script>
export default {

}
</script>
