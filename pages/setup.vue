<template>
  <div>
    <section class="pt-12 pb-24 text-center bg-gray-900 text-white">
      <h1 class="text-5xl font-bold uppercase" v-text="$i18n.t('setup.title')" />
    </section>
    <section class="container mx-auto setup-panel">
      <div class="step active">
        <h1 v-text="$i18n.t('setup.steps.preset')" />
        <div class="content">
          <!-- <div>Preset options</div> -->

          <div class="grid grid-flow-col grid-cols-3 gap-4">
            <div
              v-for="(preset, key) in presets"
              :key="'preset-' + key"
              :class="['preset-card', { 'selected': settingsToApply.preset === key }]"
              role="option"
              @click="settingsToApply.preset = key"
            >
              <h1>
                <span class="title" v-text="$i18n.t('setup.presets.' + key + '.title')" />
                <span class="preview">{{ preset.preview }}</span>
              </h1>
              <div class="description" v-text="$i18n.t('setup.presets.' + key + '.description')" />
            </div>
          </div>
        </div>
      </div>

      <div class="step">
        <h1>Engedélyek</h1>
        <div class="description">
          Engedélyezd, hogy hangot játsszon le az alkalmazás és/vagy hogy értesítést küldjön, ha lejárt az idő. Megígérjük, nem fogunk visszaélni ezekkel!
        </div>
      </div>

      <div class="finish-button" role="button" @click="applyFinalSettings" v-text="$i18n.t('setup.startButton')" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
section.setup-panel {
  @apply bg-gray-100 border border-gray-300 shadow-xl rounded-lg -mt-8 divide-y divide-gray-400;

  & > .step {
    @apply p-4;

    & > h1 {
      @apply text-2xl font-bold uppercase text-gray-800 mb-2;
    }

    & > .content {
      @apply overflow-hidden scale-y-0 transform;

      transition: transform 500ms ease-out;
    }

    &.active > .content {
      @apply scale-y-100;
    }

    & > .description {
      @apply text-black text-opacity-90 -mt-1;
    }
  }

  div.preset-card {
    @apply bg-gray-50 p-3 border border-gray-200 text-black cursor-pointer select-none;

    h1 {
      @apply text-lg;

      & > span.title {
        @apply font-bold uppercase;
      }

      & > span.preview {
        @apply float-right;
      }
    }

    & > div.description {
      @apply text-opacity-80 text-black;
    }

    &.selected {
      @apply bg-primary text-white shadow-md;

      & > div.description {
        @apply text-white;
      }
    }
  }

  .finish-button {
    @apply bg-green-600 text-white font-bold text-lg text-center p-2 rounded-lg border border-green-700 uppercase hover:bg-green-700 cursor-pointer m-4 mt-0;
  }
}
</style>

<script>
import { AvailableTimers } from '@/store/settings'

export default {
  data () {
    return {
      step: 0,
      settingsToApply: {
        preset: 'default'
      },
      presets: {
        traditional: {
          preview: '25-5-15',
          settings: {
            schedule: {
              lengths: {
                work: 25 * 60 * 1000, // 25 minutes
                shortpause: 5 * 60 * 1000, // 5 minutes
                longpause: 15 * 60 * 1000 // 15 minutes
              }
            },
            adaptiveTicking: {
              enabled: false
            },
            currentTimer: AvailableTimers.TIMER_TRADITIONAL
          }
        },
        default: {
          preview: '25-5-15',
          settings: {
            schedule: {
              lengths: {
                work: 25 * 60 * 1000, // 25 minutes
                shortpause: 5 * 60 * 1000, // 5 minutes
                longpause: 15 * 60 * 1000 // 15 minutes
              }
            },
            adaptiveTicking: {
              enabled: true
            },
            currentTimer: AvailableTimers.TIMER_APPROXIMATE
          }
        },
        hardcore: {
          preview: '50-10-30',
          settings: {
            schedule: {
              lengths: {
                work: 50 * 60 * 1000, // 50 minutes
                shortpause: 10 * 60 * 1000, // 10 minutes
                longpause: 30 * 60 * 1000 // 30 minutes
              }
            },
            adaptiveTicking: {
              enabled: true
            },
            currentTimer: AvailableTimers.TIMER_PERCENTAGE
          }
        }
      }
    }
  },

  methods: {
    applyFinalSettings () {
      const finalOptions = {
        ...this.presets[this.settingsToApply.preset].settings
      }

      this.$store.commit('settings/mergeSettings', finalOptions)

      this.$router.push('/timer')
    }
  },

  head () {
    return {
      title: `AnotherPomodoro: ${this.$i18n.t('setup.head').toLowerCase()}`
    }
  }
}
</script>
