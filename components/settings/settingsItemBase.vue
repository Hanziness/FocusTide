<template>
  <v-list-item
    v-if="visible"
    :disabled="disabled"
    :two-line="showDescription"
  >
    <v-list-item-avatar v-if="!!icon">
      <slot name="item-icon">
        <v-icon v-if="icon" v-text="icon" />
      </slot>
    </v-list-item-avatar>
    <!-- Title and description of the settings item -->
    <v-list-item-content>
      <v-list-item-title>
        <slot name="item-title">
          {{ $i18n.t(translationKey + '._title') }}
        </slot>
      </v-list-item-title>
      <v-list-item-subtitle v-if="showDescription">
        <slot name="item-subtitle">
          {{ $i18n.t(translationKey + '._description') }}
        </slot>
      </v-list-item-subtitle>

      <!-- Content to show below the title and description -->
      <slot name="content-main" />
    </v-list-item-content>
    <v-list-item-action v-if="!!$slots['content-action']" class="d-flex flex-row align-center my-0 settings-item-action">
      <!-- Reset button -->
      <v-tooltip v-if="defaultValue !== undefined" left>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon class="mr-2" v-bind="attrs" v-on="on" @click.stop="reset">
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
        </template>
        <span>{{ $i18n.t('settings.buttons.reset') }}</span>
      </v-tooltip>

      <!-- Inputs aligned to the right -->
      <slot name="content-action" />
    </v-list-item-action>
  </v-list-item>
</template>

<style lang="scss" scoped>
div.v-list-item__subtitle {
  line-height: 1.3;
}
</style>

<script>
export default {
  props: {
    defaultValue: {
      type: [String, Number, Object],
      default: undefined
    },
    showDescription: {
      type: Boolean,
      default: true
    },
    settingsKey: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      isInputValid: true
    }
  },

  computed: {
    translationKey: {
      get () {
        return 'settings.values.' + this.settingsKey.join('.')
      }
    }
  }
}
</script>

<style>
.settings-item-action {
  max-width: 30%;
}

.settings-input {
  font-size: 14px;
}
</style>
