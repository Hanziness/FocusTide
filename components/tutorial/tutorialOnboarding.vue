<template>
  <popup-sheet class="fixed w-full max-w-2xl md:p-4" open>
    <div class="flex flex-col px-6 pt-6 pb-6 transition bg-white shadow-lg md:pb-3 rounded-t-2xl md:rounded-2xl">
      <transition enter-active-class="transition" enter-class="translate-x-4 opacity-0" leave-to-class="-translate-x-4 opacity-0" leave-active-class="transition" mode="out-in">
        <!-- Welcome screen -->
        <div v-if="page === 0" key="page-index" class="flex flex-col">
          <div class="flex flex-col items-center gap-2 mb-2">
            <img src="/favicon.svg" class="p-3 bg-work bg-opacity-20 rounded-xl" width="72">
            <h2 class="mt-2 text-xl font-bold uppercase">
              Welcome to AnotherPomodoro!
            </h2>
            <p>Take a quick look around on how to use the app effectively.</p>
          </div>
        </div>
        <div v-if="page === 1" key="tutorial-1" class="flex flex-col items-center gap-2">
          <ClockIcon size="72" class="p-3 bg-work bg-opacity-20 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-work">
            Follow the clock
          </h2>
          <p>Work or take a break until the timer runs out. Then proceed with your next timer.</p>
        </div>
        <div v-if="page === 2" key="tutorial-2" class="flex flex-col items-center gap-2">
          <MugIcon size="72" class="p-3 bg-shortpause bg-opacity-20 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-shortpause">
            Rest regularly
          </h2>
          <p>Every few breaks you get more time to rest. Make good use of it.</p>
        </div>
        <div v-if="page === 3" key="tutorial-3" class="flex flex-col items-center gap-2">
          <SettingsIcon size="72" class="p-3 bg-longpause bg-opacity-20 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-longpause">
            Stay flexible
          </h2>
          <p>Set your own timers, use the task list and notifications to your advantage. Check out the settings menu for more opportunities!</p>
        </div>
        <div v-if="page === 4" key="tutorial-4" class="flex flex-col items-center gap-2">
          <HeartIcon size="72" class="p-3 text-black bg-amber-400 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-amber-500">
            Support the project
          </h2>
          <p>If this project helped you, consider inviting the author to a coffee. You can find the support button in the settings menu, too.</p>
        </div>
      </transition>
      <div class="flex-grow" />
      <div class="flex flex-col gap-2 mt-4 md:flex-row">
        <button class="flex-grow w-full py-2 transition border-2 rounded-full text-work border-work hover:bg-work hover:text-white" @click="$emit('close')">
          Close
        </button>
        <button v-if="page === 0" class="flex-grow w-full py-2 text-white transition border-2 rounded-full border-work bg-work" @click="page = 1">
          Start tutorial
        </button>
        <button v-else-if="page < 4" class="flex-grow w-full py-2 text-white transition border-2 rounded-full border-work bg-work" @click="page += 1">
          Next
        </button>
        <a v-else-if="page === 4" href="https://www.buymeacoffee.com/imreg?utm_source=anotherpomodoro&utm_medium=cta&utm_campaign=onboarding" target="_blank" class="flex-grow w-full py-2 text-center text-black transition border-2 rounded-full border-amber-400 bg-amber-400">
          Support the project
        </a>
      </div>
    </div>
  </popup-sheet>
</template>

<script>
import { ClockIcon, MugIcon, SettingsIcon, HeartIcon } from 'vue-tabler-icons'

import PopupSheet from '@/components/base/popupSheet.vue'

export default {
  components: { PopupSheet, ClockIcon, MugIcon, SettingsIcon, HeartIcon },
  data () {
    return {
      page: 0
    }
  }
}
</script>
