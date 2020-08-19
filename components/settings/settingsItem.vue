<template>
  <v-list-item>
    <v-list-item-content>{{ $i18n.t('settings.values.' + stateKeys.join('.') + '._title') }}</v-list-item-content>
    <v-list-item-action class="d-flex flex-row align-center my-0 settings-item-action">
      <v-tooltip v-if="defaultValue !== null" left>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon class="mr-2" v-bind="attrs" v-on="on" @click.stop="reset">
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
        </template>
        <span>Reset</span>
      </v-tooltip>
      <v-form v-model="isInputValid">
        <v-switch v-if="type === 'boolean'" v-model="settingValue" inset readonly @click.stop="toggleValue" />
        <v-select
          v-else-if="type === 'select'"
          v-model="settingValue"
          class="settings-input"
          outlined
          dense
          hide-details
          :items="transformedValues"
        />
        <v-text-field
          v-else-if="type === 'number'"
          v-model="settingValue"
          :rules="ruleFunctions"
          outlined
          dense
          class="settings-input"
          hide-details
        />
      </v-form>
    </v-list-item-action>
  </v-list-item>
</template>

<style lang="scss" scoped>
.settings-item-action {
  max-width: 40%;
}

.settings-input {
  font-size: 14px;
}
</style>

<script>
export const rules = {
  number (input) {
    return !!input && !isNaN(input)
  },
  positive (input) {
    return input > 0
  },
  min3 (input) {
    return input >= 3
  }
}

export default {
  props: {
    stateKeys: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'boolean',
      validator (v) {
        return ['boolean', 'select', 'number'].includes(v)
      }
    },
    values: {
      type: Array,
      default: () => []
    },
    extraAttributes: {
      type: Object,
      default: () => {}
    },
    useRules: {
      type: Array,
      default: () => [],
      validator (val) {
        return val.every(v => Object.keys(rules).includes(v))
      }
    },
    defaultValue: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      isInputValid: false
    }
  },

  computed: {
    settingValue: {
      get () {
        let currentValue = this.$store.state.settings
        for (let index = 0; index < this.stateKeys.length; index++) {
          currentValue = currentValue[this.stateKeys[index]]
        }
        return currentValue
      },
      set (newValue) {
        let isValid = true
        this.ruleFunctions.forEach(function (fn) {
          isValid = isValid && fn(newValue)
        })

        if (isValid) {
          this.$store.commit('settings/SET', { key: this.stateKeys, value: newValue })
        }
      }
    },
    transformedValues: {
      get () {
        const returnValue = []
        const i18n = this.$i18n
        this.values.forEach((element) => {
          returnValue.push({
            value: element,
            text: i18n.t('settings.values.' + this.stateKeys.join('.') + '._values.' + element)
          })
        })
        return returnValue
      }
    },
    ruleFunctions: {
      get () {
        const returnRules = []
        this.useRules.forEach(function (rule) {
          returnRules.push(rules[rule])
        })

        if (this.type === 'number' && !this.useRules.includes('number')) {
          returnRules.push(rules.number)
        }

        return returnRules
      }
    }
  },

  methods: {
    toggleValue () {
      this.settingValue = !this.settingValue
    },
    reset (event) {
      // do something
    }
  }
}
</script>
