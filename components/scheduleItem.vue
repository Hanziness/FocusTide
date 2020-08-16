<template>
  <v-sheet
    flat
    :elevation="active ? 4 : 2"
    :class="['schedule-item mr-2 rounded-lg pa-0', { 'current': active }]"
    :color="$store.state.settings.visuals[data._type].colour"
  >
    <v-sheet
      outlined
      height="100%"
      width="100%"
      class="rounded-lg text-center pa-2 d-flex flex-column justify-center border-active flex-grow-1"
    >
      <div class="text-capitalize text-h6">
        {{ data._type }}
      </div>
      <div class="grey--text text--darken-3">
        {{ $dayjs.formatMs(data._length, {}) }}
      </div>
    </v-sheet>
  </v-sheet>
</template>

<style lang="scss" scoped>
.schedule-item {
  display: inline-block;
  opacity: 0.4;
  width: 200px;
  height: 80px;
  // :style="{ 'clip-path': 'circle(' + item.progress * 1.4 + '% at 0% 50%)' }"
}

.schedule-item > div {
  background-color: transparent !important;
  border-width: 1pt;
  border-color: transparent;
  border-style: solid;
  transition: 300ms ease-in;
  transition-property: border-color border-width;
}

.schedule-item.current {
  opacity: 1;
}

.schedule-item.current > div {
  border-color: #757575;
}
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
