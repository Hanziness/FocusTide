<template>
  <v-item-group v-model="settingValue" :mandatory="mandatory && customValue === undefined" class="mt-2 settings-presets-itemgroup d-flex flex-row">
    <v-item
      v-for="(item, i) in values"
      :key="i"
      v-slot:default="{ active, toggle }"
      class="rounded-lg mx-1 settings-presets-item"
    >
      <v-card
        class="rounded-lg"
        outlined
        width="100%"
        :color="active ? 'primary' : ''"
        :dark="active"
        @click="toggle"
      >
        <div class="settings-preset-item-text ma-3">
          <div class="settings-preset-item-title mb-1">
            {{ item.text }}
          </div>
          <div class="settings-preset-item-description">
            {{ descriptions[item.value] }}
          </div>
        </div>
        <div v-if="active" class="settings-preset-item-checkmark ma-2">
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
    stateKeys: {
      type: Array,
      default: () => []
    },
    values: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String, Object],
      default: ''
    },
    mandatory: {
      type: Boolean,
      default: true
    },
    customValue: {
      type: [Number, String, Object],
      default: undefined
    }
  },

  computed: {
    settingValue: {
      get () {
        let foundIndex = 0
        for (let index = 0; index < this.values.length; index++) {
          if (this.values[index].value === (this.customValue !== undefined ? this.customValue : this.value)) {
            foundIndex = index
            break
          }
        }
        return foundIndex
      },
      set (newValue) {
        if (this.values[newValue] !== undefined) {
          this.$emit('input', this.values[newValue].value)
        }
      }
    },

    descriptions: {
      get () {
        const returnStrings = {}
        const t = this
        this.values.forEach((element) => {
          returnStrings[element.value] = t.$i18n.t('settings.values.' +
            t.stateKeys.join('.') + '._valueDescription.' + element.value)
        })

        return returnStrings
      }
    }
  }
}
</script>
