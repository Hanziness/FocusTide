<template functional>
  <div class="flex" v-bind="data.attrs" :class="[data.class, data.staticClass]">
    <slot name="left" />
    <slot name="right" />
  </div>
</template>

<script>
export default {

}
</script>
