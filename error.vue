<script setup lang="ts">
import { IconMoodSad as IconCrash, IconRoadSign as IconLost, IconMoodConfuzed as IconOtherError, IconRefreshAlert as IconReset, IconRefresh as IconReload, IconHome as IconHome, IconBrandGithub as IconGithub, IconBrandTwitter as IconTwitter, IconMessages as IconDiscussion, IconBug as IconShowError } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'
import type { Component, ComputedRef } from 'vue'
import { ActionType } from './components/error/types'
import UiButton from './components/base/uiButton.vue'
import { ButtonImportance, ButtonTheme } from './components/base/types/button'
import ActionBar from '~~/components/error/errorActionBar.vue'
import { useSettings } from '~~/stores/settings'

const { t } = useI18n()
const route = useRoute()
const settingsStore = useSettings()

enum ErrorType {
  Crash = 'crash',
  NotFound = 'notfound',
  Other = 'other'
}

enum Action {
  Reload = 'reload',
  Reset = 'reset',
  Home = 'home',
  GithubIssue = 'githubIssue',
  GithubDiscussion = 'githubDiscussion',
  Twitter = 'twitter'
}

/** Action button presets */
const actions: Record<ErrorType, Record<Action, ActionType>> = {
  crash: {
    reload: ActionType.RECOMMEND,
    reset: ActionType.PRIMARY,
    home: ActionType.PRIMARY,
    githubIssue: ActionType.SECONDARY,
    githubDiscussion: ActionType.SECONDARY,
    twitter: ActionType.SECONDARY
  },

  notfound: {
    home: ActionType.RECOMMEND,
    githubDiscussion: ActionType.SECONDARY,
    twitter: ActionType.SECONDARY,
    githubIssue: ActionType.HIDE,
    reload: ActionType.HIDE,
    reset: ActionType.HIDE
  },

  other: {
    reload: ActionType.RECOMMEND,
    home: ActionType.PRIMARY,
    reset: ActionType.PRIMARY,
    githubIssue: ActionType.SECONDARY,
    githubDiscussion: ActionType.SECONDARY,
    twitter: ActionType.SECONDARY
  }
}

const props = defineProps({
  error: {
    type: Object,
    default: null
  }
})

const state = reactive({
  showError: false
})

/** Determines what type of error happened */
const currentErrorType: ComputedRef<ErrorType> = computed(() => {
  if (Number.parseInt(props.error.statusCode) >= 500) { return ErrorType.Crash }
  if (Number.parseInt(props.error.statusCode) === 404) { return ErrorType.NotFound }
  return ErrorType.Other
})

const Icons: Record<ErrorType, Component> = {
  crash: IconCrash,
  notfound: IconLost,
  other: IconOtherError
}

const errorHeading = computed(() => t('errorpage.title.' + currentErrorType.value))

/** The title and icon to show on the error page.
 * For example on a 404 error it would show "Looks like you're lost",
 * but on an app error (eg. "crash" because of a store error) it would show
 * "Oops, the app crashed". Can return the icon as well.
 */
useHead({
  title: errorHeading.value
})

/** Returns actions to show or recommend based on the error.
 * For example if it's a 404 error, go to home or the
 * discussion button is recommended but the reset button is hidden.
 */
const recommendedActions = computed(() => {
  return actions[currentErrorType.value]
})

const fullError = computed(() => {
  return Object.assign({}, props.error, { route })
})

/// Ask settings to reset and navigate back to the home page
const actionReset = () => {
  settingsStore.setReset(true)
  location.assign('/')
}

/// Reload the current page
const actionReload = () => {
  location.reload()
}

interface ButtonStyleMapping {
  theme: ButtonTheme,
  importance: ButtonImportance
}

const actionTypeToButtonStyle = (action: ActionType): ButtonStyleMapping => {
  switch (action) {
    case ActionType.RECOMMEND:
      return {
        theme: ButtonTheme.Primary,
        importance: ButtonImportance.Filled
      }
    case ActionType.PRIMARY:
      return {
        theme: ButtonTheme.Primary,
        importance: ButtonImportance.Outline
      }
    case ActionType.SECONDARY:
      return {
        theme: ButtonTheme.Secondary,
        importance: ButtonImportance.Outline
      }
    default: {
      return {
        theme: ButtonTheme.Neutral,
        importance: ButtonImportance.Outline
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-screen min-h-screen p-6 text-surface-ondark bg-surface-dark dark">
    <div>
      <component :is="Icons[currentErrorType]" size="128" stroke-width="1.25" />
    </div>
    <h1 class="mt-2 text-5xl font-bold tracking-tighter text-center uppercase" v-text="errorHeading" />

    <!-- Error description -->
    <div class="max-w-screen-lg mt-8 border-2 border-gray-300 rounded-lg">
      <transition name="showerror-transition" mode="out-in">
        <div v-if="!state.showError" class="flex flex-row items-center p-4 space-x-4 text-surface-ondark transition bg-surface-darkvariant cursor-pointer" role="button" @click="state.showError = true">
          <IconShowError size="42" />
          <div>
            <div class="font-bold" v-text="$t('errorpage.showError.main')" />
            <div v-text="$t('errorpage.showError.sub')" />
          </div>
        </div>
        <div v-else-if="state.showError" class="p-4 overflow-y-scroll max-h-56 max-w-full break-before-all">
          <pre v-text="fullError" />
        </div>
      </transition>
    </div>

    <!-- Recommended actions -->
    <ActionBar class="mt-8">
      <UiButton :data-row="recommendedActions.reset" v-bind="actionTypeToButtonStyle(recommendedActions.reset)" @click="actionReset">
        <IconReset class="mr-1" />
        <div v-text="$t('errorpage.action.reset')" />
      </UiButton>
      <UiButton :data-row="recommendedActions.reload" v-bind="actionTypeToButtonStyle(recommendedActions.reload)" @click="actionReload">
        <IconReload class="mr-1" />
        <div v-text="$t('errorpage.action.reload')" />
      </UiButton>
      <UiButton link :data-row="recommendedActions.home" v-bind="actionTypeToButtonStyle(recommendedActions.home)" href="/">
        <IconHome class="mr-1" />
        <div v-text="$t('errorpage.action.home')" />
      </UiButton>
      <UiButton link :data-row="recommendedActions.githubIssue" v-bind="actionTypeToButtonStyle(recommendedActions.githubIssue)" href="https://github.com/Hanziness/FocusTide/issues?utm_source=AnotherPomodor&utm_medium=web&utm_content=error">
        <IconGithub class="mr-1" />
        <div v-text="$t('errorpage.action.githubIssue')" />
      </UiButton>
      <UiButton link :data-row="recommendedActions.githubDiscussion" v-bind="actionTypeToButtonStyle(recommendedActions.githubDiscussion)" href="https://github.com/Hanziness/FocusTide/discussions?utm_source=AnotherPomodor&utm_medium=web&utm_content=error">
        <IconDiscussion class="mr-1" />
        <div v-text="$t('errorpage.action.githubDiscussion')" />
      </UiButton>
      <UiButton link :data-row="recommendedActions.twitter" v-bind="actionTypeToButtonStyle(recommendedActions.home)" href="https://twitter.com/FocusTide?utm_source=AnotherPomodor&utm_medium=web&utm_content=error">
        <IconTwitter class="mr-1" />
        <div v-text="$t('errorpage.action.twitter')" />
      </UiButton>
    </ActionBar>
  </div>
</template>

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
