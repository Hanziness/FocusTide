<template>
  <div :style="{ 'color': colour }" class="cursor-pointer" @click="$emit('click', $event)">
    <component :is="icon" v-bind="{ title: '' }" />
  </div>
</template>

<script>
import IconWait from 'vue-material-design-icons/CircleOutline.vue'
import IconProgress from 'vue-material-design-icons/Circle.vue'
import IconComplete from 'vue-material-design-icons/CheckCircle.vue'

export default {
  components: {
    IconWait, IconProgress, IconComplete
  },

  props: {
    status: {
      type: Number,
      required: true
    },
    section: {
      type: String,
      default: null
    }
  },

  computed: {
    icon () {
      switch (this.status) {
        case 0: return 'IconWait'
        case 1: return 'IconProgress'
        case 2: return 'IconComplete'
        default: return 'IconWait'
      }
    },

    colour () {
      if (!this.section || !this.$store.state.settings.visuals[this.section]) { return 'white' }
      return this.$store.state.settings.visuals[this.section].colour
    }
  }
}
</script>
