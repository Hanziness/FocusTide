<template>
  <transition name="settings">
    <section v-show="processedValue" class="settings-panel sm:w-full md:w-1/2">
      <span class="float-right" @click="processedValue = false">Close</span>
      <h1 class="text-xl">
        Beállítások
      </h1>
      <div class="flex flex-column">
        <settings-check :settings-key="['adaptiveTicking', 'enabled']" />
        <divider />
        <settings-check :settings-key="['permissions', 'audio']" />

        <divider />

        <settings-check :settings-key="['performance', 'showProgressBar']" />
        <settings-text :settings-key="['schedule', 'longPauseInterval']" :min="1" numeric />
        <settings-time :settings-key="['schedule', 'lengths', 'work']" />
        <settings-options :values="{traditional: 'traditional', approximate: 'approximate', percentage: 'percentage'}" :settings-key="['currentTimer']" />
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'SettingsPanel',
  components: {
    // UiOverlay: () => import('@/components/tailwinded/base/overlay.vue'),
    SettingsCheck: () => import('@/components/tailwinded/settings/items/settingsCheck.vue'),
    SettingsText: () => import('@/components/tailwinded/settings/items/settingsText.vue'),
    SettingsTime: () => import('@/components/tailwinded/settings/items/settingsTime.vue'),
    SettingsOptions: () => import('@/components/tailwinded/settings/items/settingsOptions.vue'),
    Divider: () => import('@/components/tailwinded/base/divider.vue')
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    processedValue: {
      get () { return this.value },
      set (newValue) { this.$emit('input', newValue) }
    }
  }
}
</script>

<style lang="scss" scoped>
section.settings-panel {
  @apply bg-white h-full fixed shadow w-2/5 px-4;

  z-index: 20;
}

.settings-enter-active,
.settings-leave-active {
  transition: transform 200ms ease-in;
}

.settings-enter,
.settings-leave-to {
  transform: translateX(-100%);
}
</style>
