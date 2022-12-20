<script setup lang="ts">
import OptionGroup from '~~/components/base/optionGroup.vue'
</script>

<template>
  <div class="h-96 flex flex-col">
    <OptionGroup :choices="{'pomodoro': 'Pomodoro', 'short': 'Short times'}" :value="'short'" />
  </div>
</template>
