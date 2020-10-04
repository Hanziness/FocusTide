<template>
  <div class="w-full h-full flex flex-column justify-center align-center bg-purple-200">
    <p>Settings come here</p>
    <section class="bg-white rounded-lg shadow-xl w-3/5 py-3">
      <!-- Header -->
      <h1 class="mb-2">
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
        <transition-group tag="div" name="tab-transition" mode="out-in" class="overflow-hidden w-full relative">
          <div v-if="activeTab == 1" :key="1">
            <p>Tab 1</p>
          </div>
          <div v-else-if="activeTab == 2" :key="2">
            <p>Tab 2</p>
          </div>
          <div v-else-if="activeTab == 3" :key="3">
            <p>Tab 3</p>
          </div>
        </transition-group>
      </div>
      <!-- Footer -->
      <div class="modal-footer">
        <p>Footer</p>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
h1 {
  @apply text-xl;
}

.tab-header {
  @apply flex-1 h-10 bg-gray-300 p-2 cursor-pointer text-center;

  transition: border-color 0.2s ease-out;
}

.tab-transition-enter-active,
.tab-transition-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.tab-transition-enter {
  transform: translateX(-400px);
  opacity: 0;
}

.tab-transition-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
</style>

<script>
export default {
  data () {
    return {
      activeTab: 1
    }
  }
}
</script>
