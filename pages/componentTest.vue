<template>
  <div class="w-full h-full flex flex-column justify-center align-center bg-purple-200">
    <p>Settings come here</p>
    <section class="bg-white rounded-lg shadow-xl w-3/5 py-4">
      <!-- Header -->
      <h1 class="mb-2 mx-4">
        Settings
      </h1>
      <!-- Content -->
      <div class="modal-body">
        <!-- Tab headers -->
        <div class="flex flex-row">
          <div class="tab-header" :class="[{'border-b-2 border-blue-500': activeTab == 1}]" @click="activeTab = 1">
            Main
          </div>
          <div class="tab-header" :class="[{'border-b-2 border-blue-500': activeTab == 2}]" @click="activeTab = 2">
            Schedule
          </div>
          <div class="tab-header" :class="[{'border-b-2 border-blue-500': activeTab == 3}]" @click="activeTab = 3">
            Display
          </div>
        </div>
        <!-- Tab content -->
        <transition tag="div" name="tab-transition" mode="out-in" class="overflow-hidden w-full relative">
          <div v-if="activeTab == 1" :key="1">
            <p>Tab 1</p>
          </div>
          <div v-else-if="activeTab == 2" :key="2">
            <!-- <settings-item-base :settings-key="['performance', 'showProgressBar']">
              <template #content-action="{ update, value }">
                {{ value }}
                <input type="checkbox" :checked="value" @input="update($event.target.checked)">
              </template>
            </settings-item-base> -->
            <settings-check :settings-key="['performance', 'showProgressBar']" />
            <settings-text :settings-key="['schedule', 'longPauseInterval']" />
            <settings-time :settings-key="['schedule', 'lengths', 'work']" />
            <settings-options :values="{traditional: 'traditional', approximate: 'approximate', percentage: 'percentage'}" :settings-key="['currentTimer']" />
          </div>
          <div v-else-if="activeTab == 3" :key="3">
            <p>Tab 3</p>
          </div>
        </transition>
      </div>
      <!-- Footer -->
      <!-- <div class="modal-footer">
        <p>Footer</p>
      </div> -->
    </section>
  </div>
</template>

<style lang="scss">
h1 {
  @apply text-xl;
}

.tab-header {
  @apply flex-1;
  @apply h-10;
  @apply bg-gray-300;
  @apply p-2;
  @apply cursor-pointer;
  @apply text-center;

  transition: border-color 0.2s ease-out;
}

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

.modal-footer {
  @apply mx-4;
}
</style>

<script>
export default {
  components: {
    // SettingsItemBase: () => import('@/components/tailwinded/settings/baseSettingsItem.vue')
    SettingsCheck: () => import('@/components/tailwinded/settings/items/settingsCheck.vue'),
    SettingsText: () => import('@/components/tailwinded/settings/items/settingsText.vue'),
    SettingsTime: () => import('@/components/tailwinded/settings/items/settingsTime.vue'),
    SettingsOptions: () => import('@/components/tailwinded/settings/items/settingsOptions.vue')
  },

  data () {
    return {
      activeTab: 1
    }
  }
}
</script>
