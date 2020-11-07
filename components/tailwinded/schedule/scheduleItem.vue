<template>
  <div
    :class="[
      'schedule-item mr-2 rounded-lg pa-0',
      { 'current': active },
      { 'shadow-sm': !active, 'shadow': active }
    ]"
    :style="[
      { 'background-color': $store.state.settings.visuals[data.type].colour }
    ]"
  >
    <!-- <div class="text-center">
      <div class="text-h6">
        {{ $i18n.t('section.' + data._type) }}
      </div>
      <div class="">
        {{ $dayjs.formatMs(data._length, {}) }}
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.schedule-item {
  display: inline-block;
  opacity: 0.4;
  width: 48px;
  height: 48px;
  position: relative;
  border-width: 1pt;
  border-color: transparent;
  border-style: solid;
  transition: border-color 300ms ease-in;
  // transition-property: border-color opacity;
  // width: 200px;
  // height: 80px;
}

.schedule-item:last-of-type {
  margin-right: 0 !important;
}

.schedule-item.current {
  opacity: 1;
  border-color: theme('colors.gray.100');
}

// .schedule-item.current > div {
//   // border-color: #757575;
// }
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
