<template>
  <transition name="settings">
    <section v-show="processedValue" class="settings-panel sm:w-full md:w-1/2">
      <div class="settings-panel-main">
        <h1 class="text-xl">
          {{ $i18n.t('settings.heading') }}
          <button class="float-right button-close" @click="processedValue = false">
            <close-icon />
          </button>
        </h1>
        <div class="flex flex-column">
          <transition tag="div" name="tab-transition" mode="out-in" class="overflow-hidden w-full relative">
            <div v-if="activeTab === 1" :key="1">
              <settings-check :settings-key="['adaptiveTicking', 'enabled']" />
              <divider />
              <settings-check :settings-key="['permissions', 'audio']" />
            </div>

            <div v-if="activeTab === 2" :key="2">
              <settings-check :settings-key="['performance', 'showProgressBar']" />
              <settings-text :settings-key="['schedule', 'longPauseInterval']" :min="1" numeric />
              <settings-time :settings-key="['schedule', 'lengths', 'work']" />
              <settings-options :values="{traditional: 'traditional', approximate: 'approximate', percentage: 'percentage'}" :settings-key="['currentTimer']" />
            </div>
          </transition>
        </div>
      </div>
      <div class="settings-panel-menubar">
        <div class="tab-header" :class="[{'active': activeTab === 1}]" @click="activeTab = 1">
          <span>{{ $i18n.t('settings.tabs.main') }}</span>
        </div>
        <div class="tab-header" :class="[{'active': activeTab === 2}]" @click="activeTab = 2">
          <span>{{ $i18n.t('settings.tabs.timer') }}</span>
        </div>
        <div class="tab-header" :class="[{'active': activeTab === 3}]" @click="activeTab = 3">
          <span>{{ $i18n.t('settings.tabs.display') }}</span>
        </div>
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
    Divider: () => import('@/components/tailwinded/base/divider.vue'),
    CloseIcon: () => import('vue-material-design-icons/Close')
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      activeTab: 1
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
  @apply bg-white h-full fixed shadow w-2/5 flex flex-col;

  z-index: 1001;
}

div.settings-panel-main {
  @apply px-4 flex-grow overflow-y-auto;
}

div.settings-panel-menubar {
  @apply flex-none h-12 flex flex-row;
}

div.tab-header {
  @apply flex-1 h-full bg-gray-300 p-2 cursor-pointer text-center flex items-center justify-center;

  transition: border-color 0.2s ease-out;
  box-sizing: border-box;
}

div.tab-header.active {
  @apply bg-blue-300;
}

// ===== TAB TRANSITIONS =====
.tab-transition-enter-active,
.tab-transition-leave-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  // transition: opacity 0.5s ease-out;
  position: relative;
}

.tab-transition-enter {
  transform: translateY(10px);
  opacity: 0;
}

.tab-transition-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

// ===== CLOSE BUTTON =====
.button-close {
  @apply p-2 rounded-full -mt-1 -mr-1;

  transition: background-color 200ms ease-out;
}

.button-close:hover {
  @apply bg-gray-200;
}

.button-close:active {
  @apply bg-gray-400;
}
</style>
