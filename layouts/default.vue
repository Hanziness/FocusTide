<template>
  <div :class="[{ 'dark': $store.state.settings.visuals.darkMode }]">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>
