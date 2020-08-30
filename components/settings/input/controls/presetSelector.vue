<template>
  <v-item-group class="mt-2 settings-presets-itemgroup d-flex flex-row">
    <v-item
      v-for="(item, i) in items"
      :key="i"
      class="rounded-lg mx-1 settings-presets-item"
    >
      <v-card
        class="rounded-lg"
        outlined
        width="100%"
        :color="processedValue === getKey(item) ? 'primary' : ''"
        :dark="processedValue === getKey(item)"
        @click="processedValue = getKey(item)"
      >
        <div class="settings-preset-item-text ma-3">
          <div class="settings-preset-item-title mb-1">
            {{ item.text }}
          </div>
          <div class="settings-preset-item-description">
            {{ item.description }}
          </div>
        </div>
        <div v-if="processedValue === item.key" class="settings-preset-item-checkmark ma-2">
          <v-icon>mdi-check</v-icon>
        </div>
      </v-card>
    </v-item>
  </v-item-group>
</template>

<style lang="scss" scoped>
div.settings-presets-itemgroup {
  width: 100%;
}

div.settings-presets-item:first-child {
  margin-left: 0 !important;
}

div.settings-presets-item:last-child {
  margin-right: 0 !important;
}

.settings-preset-item-description {
  font-style: italic;
}

.settings-preset-item-text {
  line-height: 1.4;
  font-size: 15px;
}

div.settings-preset-item-checkmark {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

<script>
export default {
  props: {
    value: {
      type: [String],
      default: null
    },
    items: {
      type: Array,
      default: () => [],
      validator: (v) => {
        if (v.length === 0) { return true }

        // every object should have a 'text' and 'value' field
        return v.every((item) => {
          return ['text', 'value'].every((key) => { return Object.keys(item).includes(key) })
        })
      }
    },
    activeItemGetter: {
      type: String,
      default: undefined
    }
  },

  computed: {
    processedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('change', newValue)
      }
    },

    descriptions: {
      get () {
        const returnStrings = {}
        const t = this
        this.items.forEach((element) => {
          returnStrings[t.getKey(element)] = t.$i18n.t('settings.values.' +
            t.stateKeys.join('.') + '._valueDescription.' + t.getKey(element))
        })

        return returnStrings
      }
    }
  },

  methods: {
    getKey (obj) {
      if (obj.key) {
        return obj.key
      }
      return obj.value
    }
  }
}
</script>
