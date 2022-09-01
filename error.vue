<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen p-6 text-gray-100 bg-gray-900">
    <div>
      <component :is="errorHeading.icon" size="128" stroke-width="1.25" />
    </div>
    <h1 class="mt-2 text-5xl font-bold tracking-tighter text-center uppercase" v-text="errorHeading.title" />

    <!-- Error description -->
    <div class="max-w-screen-lg mt-8 overflow-hidden border-2 border-gray-300 rounded-lg">
      <transition name="showerror-transition" mode="out-in">
        <div v-if="!showError" class="flex flex-row items-center p-4 space-x-4 text-gray-100 transition bg-gray-700 cursor-pointer hover:bg-gray-600 active:bg-gray-800" role="button" @click="showError = true">
          <IconShowError size="42" />
          <div>
            <div class="font-bold" v-text="$t('errorpage.showError.main')" />
            <div v-text="$t('errorpage.showError.sub')" />
          </div>
        </div>
        <pre v-else-if="showError" class="p-4 overflow-y-scroll max-h-56" v-text="fullError" />
      </transition>
    </div>

    <!-- Recommended actions -->
    <ActionBar class="mt-8">
      <ActionButton v-bind="getRowAndState('reset')" class="text-red-500" text-colours @click="actionReset">
        <IconReset />
        <div v-text="$t('errorpage.action.reset')" />
      </ActionButton>
      <ActionButton v-bind="getRowAndState('reload')" class="text-blue-500" text-colours @click="actionReload">
        <IconReload />
        <div v-text="$t('errorpage.action.reload')" />
      </ActionButton>
      <ActionButton v-bind="getRowAndState('home')" class="text-emerald-500" text-colours href="/">
        <IconHome />
        <div v-text="$t('errorpage.action.home')" />
      </ActionButton>
      <ActionButton v-bind="getRowAndState('githubIssue')" class="text-gray-400" text-colours href="https://github.com/Hanziness/AnotherPomodoro/issues?utm_source=AnotherPomodor&utm_medium=web&utm_content=error">
        <IconGithub />
        <div v-text="$t('errorpage.action.githubIssue')" />
      </ActionButton>
      <ActionButton v-bind="getRowAndState('githubDiscussion')" class="text-gray-400" text-colours href="https://github.com/Hanziness/AnotherPomodoro/discussions?utm_source=AnotherPomodor&utm_medium=web&utm_content=error">
        <IconDiscussion />
        <div v-text="$t('errorpage.action.githubDiscussion')" />
      </ActionButton>
      <ActionButton v-bind="getRowAndState('twitter')" class="text-[#1da1f2]" text-colours href="https://twitter.com/AnotherPomodoro?utm_source=AnotherPomodor&utm_medium=web&utm_content=error">
        <IconTwitter />
        <div v-text="$t('errorpage.action.twitter')" />
      </ActionButton>
    </ActionBar>
  </div>
</template>

<script>
import { MoodSadIcon, RoadSignIcon, MoodConfuzedIcon, RefreshAlertIcon, RefreshIcon, HomeIcon, BrandGithubIcon, BrandTwitterIcon, MessagesIcon, BugIcon } from 'vue-tabler-icons'
import { mapActions } from 'pinia'
import ActionButton from '@/components/error/action.vue'
import ActionBar from '@/components/error/actionBar.vue'
import { useSettings } from '~~/stores/settings'

const actionType = {
  RECOMMEND: 'recommended',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  HIDE: 'disabled'
}

/** Action button presets */
const actions = {
  crash: {
    reload: actionType.RECOMMEND,
    reset: actionType.PRIMARY,
    home: actionType.PRIMARY,
    githubIssue: actionType.SECONDARY,
    githubDiscussion: actionType.SECONDARY,
    twitter: actionType.SECONDARY
  },

  notfound: {
    home: actionType.RECOMMEND,
    githubDiscussion: actionType.SECONDARY,
    twitter: actionType.SECONDARY
  },

  other: {
    reload: actionType.RECOMMEND,
    home: actionType.PRIMARY,
    reset: actionType.PRIMARY,
    githubIssue: actionType.SECONDARY,
    githubDiscussion: actionType.SECONDARY,
    twitter: actionType.SECONDARY
  }
}

export default {
  name: 'ErrorPage',
  components: {
    // Error reason icons
    IconCrash: MoodSadIcon,
    IconLost: RoadSignIcon,
    IconOtherError: MoodConfuzedIcon,

    // Show error icon
    IconShowError: BugIcon,

    // Action icons
    IconReset: RefreshAlertIcon,
    IconReload: RefreshIcon,
    IconHome: HomeIcon,
    IconGithub: BrandGithubIcon,
    IconDiscussion: MessagesIcon,
    IconTwitter: BrandTwitterIcon,

    ActionButton,
    ActionBar
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      showError: false
    }
  },

  head () {
    return {
      title: this.errorHeading.title
    }
  },

  computed: {
    /** Determines what type of error happened */
    errorType () {
      if (this.error.statusCode >= 500) { return 'crash' }
      if (this.error.statusCode === 404) { return 'notfound' }
      return 'other'
    },

    /** The title and icon to show on the error page.
     * For example on a 404 error it would show "Looks like you're lost",
     * but on an app error (eg. "crash" because of a store error) it would show
     * "Oops, the app crashed". Can return the icon as well.
     */
    errorHeading () {
      let icon = 'IconOtherError'

      if (this.errorType === 'crash') {
        icon = 'IconCrash'
      } else if (this.errorType === 'notfound') {
        icon = 'IconLost'
      }

      return {
        title: this.$t('errorpage.title.' + this.errorType),
        icon
      }
    },

    /** Returns actions to show or recommend based on the error.
     * For example if it's a 404 error, go to home or the
     * discussion button is recommended but the reset button is hidden.
     */
    recommendedActions () {
      return actions[this.errorType]
    },

    fullError () {
      return Object.assign({}, this.error, { route: this.$route })
    }
  },

  methods: {
    ...mapActions(useSettings, ['setReset']),

    getRowAndState (action) {
      let row = 'hidden'
      let state = 'disabled'

      if (this.recommendedActions[action] && this.recommendedActions[action] === actionType.RECOMMEND) {
        state = 'recommended'
        row = 'recommended'
      }

      if (this.recommendedActions[action] && [actionType.PRIMARY, actionType.SECONDARY].includes(this.recommendedActions[action])) {
        state = 'default'
        row = this.recommendedActions[action]
      }

      if (['githubIssue', 'githubDiscussion'].includes(action)) {
        if (!this.showError) {
          state = 'disabled'
        }
      }

      return {
        'data-row': row,
        state
      }
    },

    /// Ask settings to reset and navigate back to the home page
    actionReset () {
      this.setReset(true)
      location.assign('/')
    },

    /// Reload the current page
    actionReload () {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.showerror-transition-enter-active {
  @apply transition-all duration-700;
}

.showerror-transition-enter {
  clip-path: circle(0%);
}

.showerror-transition-enter-to {
  clip-path: circle(75%);
}
</style>
