<template>
  <div class="snap-y snap-proximity h-screen overflow-x-hidden overflow-y-scroll">
    <div ref="top" class="invisible" />

    <!-- FAB -->
    <Transition name="fab-transition">
      <nuxt-link v-show="showFAB" v-slot="{ navigate }" to="/timer" custom>
        <div role="button" tabindex="0" class="xl:w-auto xl:right-6 xl:bottom-4 xl:rounded-lg bg-amber-300 hover:bg-amber-400 shadow-amber-300/30 hover:shadow-amber-300/60 active:duration-500 active:shadow-xl active:shadow-amber-300/80 active:bg-amber-500 border-neutral-100 fixed bottom-0 z-10 flex flex-row items-center w-full px-4 py-3 space-x-2 text-xl font-bold text-black uppercase transition border rounded-t-lg shadow-md cursor-pointer select-none" @click="navigate">
          <img src="/favicon.svg" width="32" height="32" role="presentation">
          <span v-text="$i18n.t('index.launch')" />
        </div>
      </nuxt-link>
    </Transition>

    <!-- Section 1: intro -->

    <Section ref="section-1" class="snap-center flex flex-col items-center justify-center px-4 overflow-hidden bg-gray-100">
      <Columns class="xl:flex-row xl:space-x-16 xl:px-24 xl:pt-0 flex-col gap-8 px-4 pt-8">
        <template #left>
          <!-- App title and CTAs -->
          <div class="flex flex-col justify-center transition-all duration-1000" :class="{ 'opacity-0 -translate-x-4': !loading.mainText }">
            <div class="xl:mr-16 md:flex-row md:gap-4 flex flex-col items-start gap-2">
              <!-- App icon -->
              <div class="aspect-square min-w-fit md:mt-1">
                <img src="/favicon.svg" width="68" height="68" class="p-2 bg-red-200 rounded-lg" role="presentation">
              </div>
              <!-- App name and slogan -->
              <div class="flex flex-col">
                <h1 class="md:text-5xl text-3xl font-bold">
                  AnotherPomodoro
                </h1>
                <div class="md:text-xl text-lg" v-text="$i18n.t('index.app_description')" />
              </div>
            </div>
            <!-- CTAs -->
            <div class="md:grid-flow-col grid grid-flow-row grid-cols-1 gap-2 mt-6">
              <nuxt-link v-slot="{ navigate }" to="/timer" custom>
                <div class="bg-amber-300 hover:bg-amber-400 shadow-amber-300/30 hover:shadow-amber-300/60 active:duration-500 active:shadow-xl active:shadow-amber-300/80 active:bg-amber-500 flex-grow px-6 py-4 text-2xl font-bold text-center uppercase transition-all rounded-lg shadow-lg cursor-pointer select-none" role="button" tabindex="0" @click="navigate" v-text="$i18n.t('index.cta.quickstart')" />
              </nuxt-link>
              <!-- <nuxt-link v-slot="{ navigate }" to="/setup" custom>
                <div class="bg-slate-300 hover:bg-gray-300 shadow-slate-300/0 hover:shadow-slate-300/40 hover:shadow-lg active:shadow-slate-300/60 active:bg-slate-400 flex-grow px-6 py-4 text-2xl font-bold text-center uppercase transition-all rounded-lg cursor-pointer select-none" role="button" tabindex="0" @click="navigate" v-text="$i18n.t('index.cta.configure')" />
              </nuxt-link> -->
            </div>
          </div>
        </template>
        <!-- App screenshot -->
        <template #right>
          <div :class="['transition-all duration-1000 hover:duration-300 overflow-hidden order-first xl:order-last rounded-lg shadow-red-300/60 shadow-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-red-300/70 w-full max-w-2xl xl:max-w-max self-center', { 'opacity-0 translate-x-4': !loading.screenshot }]">
            <nuxt-img
              :alt="$i18n.t('index.alt.img.screenshot')"
              class=""
              width="1600"
              height="900"
              src="/assets/img/screenshots/720p/Timer_Default_2x.png"
              format="jpg"
              sizes="sm:760px xl:1600px"
              quality="80"
              fit="contain"
            />
          </div>
        </template>
      </Columns>

      <template #after>
        <div class="xl:absolute xl:bottom-4 flex flex-col items-center justify-end flex-grow mb-16">
          <!-- Source code, support and social buttons -->
          <div class="flex flex-row mb-4 space-x-2">
            <SupportButton
              :aria-label="$i18n.t('index.alt.links.source')"
              icon-size="28"
              type="github"
              :show-text="false"
              :default-colours="false"
              class="hover:bg-gray-800 active:bg-gray-900 p-2 text-gray-100 bg-black"
              utm-tags="?utm_source=AnotherPomodoro&utm_medium=web&utm_content=home"
              tabindex="0"
            />
            <SupportButton
              :aria-label="$i18n.t('index.alt.links.support')"
              icon-size="28"
              type="support"
              :show-text="false"
              :default-colours="false"
              class="hover:bg-gray-800 active:bg-gray-900 p-2 text-gray-100 bg-black"
              utm-tags="?utm_source=AnotherPomodoro&utm_medium=web&utm_content=home"
              tabindex="0"
            />
          </div>
          <!-- Scroll indicator -->
          <ScrollIcon size="42" />
        </div>
      </template>
    </Section>

    <!-- Section 2: about Pomodoro and the app -->
    <Section ref="section-2" class="snap-center bg-sky-100 flex flex-col justify-center px-4 overflow-hidden">
      <div class="text-sky-900 flex flex-col items-center">
        <h2 class="text-5xl font-bold tracking-tight uppercase" v-text="$i18n.t('index.section_whatitdoes.title')" />
        <div class="xl:text-xl mt-2 text-lg text-center">
          <client-only>
            <i18n path="index.section_whatitdoes.subtitle.main" tag="p">
              <b>AnotherPomodoro</b>
            </i18n>
          </client-only>
          <p v-text="$i18n.t('index.section_whatitdoes.subtitle.sub')" />
        </div>

        <!-- Schedule display imitation -->
        <div class="bg-slate-800 shadow-slate-500/20 flex flex-row p-3 mt-16 space-x-3 rounded-lg shadow-lg">
          <div :class="['transition duration-500 ring-2 ring-inset ring-transparent w-12 h-12 bg-work rounded-lg', { '!ring-white': section2selectedBox === 1 }]" />
          <div :class="['transition duration-500 ring-2 ring-inset ring-transparent w-12 h-12 bg-shortpause rounded-lg', { '!ring-white': section2selectedBox === 2 }]" />
          <div :class="['transition duration-500 ring-2 ring-inset ring-transparent w-12 h-12 bg-longpause rounded-lg', { '!ring-white': section2selectedBox === 3 }]" />
        </div>

        <!-- Schedule cards -->
        <div class="xl:grid-flow-col xl:auto-cols-auto grid items-start grid-flow-row gap-4 mt-4">
          <ScheduleCard :title="$i18n.t('index.section_whatitdoes.cards[0].title')" :description="$i18n.t('index.section_whatitdoes.cards[0].description')" :duration="$i18n.t('index.section_whatitdoes.cards[0].duration')" dot-class="bg-work" :class="[{ 'shadow-lg shadow-slate-700/30 !bg-slate-600': section2selectedBox === 1 }]" />

          <IconNext class="xl:block self-center hidden" />

          <ScheduleCard :title="$i18n.t('index.section_whatitdoes.cards[1].title')" :description="$i18n.t('index.section_whatitdoes.cards[1].description')" :duration="$i18n.t('index.section_whatitdoes.cards[1].duration')" dot-class="bg-shortpause" :class="[{ 'shadow-lg shadow-slate-700/30 !bg-slate-600': section2selectedBox === 2 }]" />

          <IconNext class="xl:block self-center hidden" />
          <IconDots class="xl:block self-center hidden" />
          <IconNext class="xl:block self-center hidden" />

          <ScheduleCard :title="$i18n.t('index.section_whatitdoes.cards[2].title')" :description="$i18n.t('index.section_whatitdoes.cards[2].description')" :duration="$i18n.t('index.section_whatitdoes.cards[2].duration')" dot-class="bg-longpause" :class="[{ 'shadow-lg shadow-slate-700/30 !bg-slate-600': section2selectedBox === 3 }]" />
        </div>
      </div>
    </Section>

    <!-- Section 3: Features -->
    <Section ref="section-3" class="snap-center bg-amber-50 flex flex-col items-center justify-start px-4 py-6 overflow-hidden text-center">
      <h2 class="text-amber-900 text-5xl font-bold tracking-tight uppercase" v-text="$i18n.t('index.section_features.title')" />

      <div class="xl:text-xl xl:grid-cols-4 xl:gap-8 grid max-w-5xl grid-flow-row grid-cols-2 gap-4 mt-8 text-lg">
        <div v-for="(feature, index) in section3.smallFeatures" :key="feature" :class="['transition duration-1000 py-4 px-4 rounded-lg text-gray-900 text-opacity-80 flex flex-col justify-center', { '!text-gray-100 text-opacity-100 bg-slate-800': section3.activeFeature === index }]" v-text="$i18n.t('index.section_features.list.' + feature)" />
      </div>
    </Section>

    <!-- Section 4: FAQ -->
    <Section ref="section-4" class="snap-center bg-amber-300 flex flex-col items-center justify-center overflow-hidden text-center">
      <h2 class="text-5xl font-bold tracking-tight text-black uppercase" v-text="$i18n.t('index.faq.title')" />

      <div class="mt-8 px-4 w-full xl:w-[1280px] xl:h-96 h-[36rem] text-left flex flex-col space-y-2">
        <details v-for="(question, i) in faq" :key="'faq-' + i" class="open:bg-gray-50 ring-1 ring-transparent open:ring-gray-400 shadow-slate-400/30 open:shadow-lg open:text-gray-900 w-full p-4 text-gray-700 transition bg-gray-100 rounded-lg" :open="openfaq === i" @click.prevent="openfaq = i">
          <summary class="font-bold cursor-pointer" v-text="$i18n.t('index.faq.accordion.' + question.q +'.q')" />
          <div class="mt-2" v-text="$i18n.t('index.faq.accordion.' + question.q + '.a')" />
          <div v-if="question.hint" class="mt-2">
            <span class="bg-amber-400 px-2 py-1 font-bold text-gray-900 rounded-lg" v-text="$i18n.t('index.faq.hint')" />
            {{ $i18n.t('index.faq.accordion.' + question.q + '.hint') }}
          </div>
        </details>
      </div>
    </Section>

    <!-- Section 5: Support -->
    <Section ref="section-5" class="snap-center bg-stone-100 flex flex-col items-center justify-start px-4 py-8 overflow-hidden text-center">
      <h2 class="text-5xl font-bold leading-tight tracking-tight text-black uppercase" v-text="$i18n.t('index.support.title')" />

      <div class="flex flex-col mt-3 space-y-1">
        <p v-text="$i18n.t('index.support.subtitle[0]')" />
        <i18n path="index.support.subtitle[1].base">
          <b>{{ $i18n.t('index.support.subtitle[1].action') }}</b>
        </i18n>
      </div>

      <div class="flex flex-row mt-8 space-x-2">
        <SupportButton type="github" default-classes />
        <SupportButton type="support" default-classes />
      </div>
      <!-- Share links -->
      <div class="my-2" v-text="$i18n.t('settings.about.share')" />
      <div class="flex flex-row items-center space-x-2 text-sm">
        <a :aria-label="$i18n.t('index.alt.links.share.twitter')" href="https://twitter.com/AnotherPomodoro?utm_source=AnotherPomodoro&utm_medium=web&utm_content=home" class="rounded-full w-12 h-12 bg-[#1da1f2] text-white flex flex-row items-center justify-center space-x-1 transition-colors">
          <AboutTwitter size="24" />
        </a>
        <a :aria-label="$i18n.t('index.alt.links.share.facebook')" href="http://www.facebook.com/share.php?u=https://another-pomodoro.netlify.app" class="rounded-full w-12 h-12 bg-[#1877f2] text-white flex flex-row items-center justify-center space-x-1 transition-colors">
          <AboutFacebook size="24" class="translate-x-[-1px]" />
        </a>
        <a :aria-label="$i18n.t('index.alt.links.share.reddit')" href="https://reddit.com/submit?url=https://another-pomodoro.netlify.app" class="rounded-full w-12 h-12 bg-[#ff4500] text-white flex flex-row items-center justify-center space-x-1 transition-colors">
          <AboutReddit size="24" />
        </a>
      </div>

      <template #after>
        <div class="flex flex-col items-center justify-end flex-grow mb-16">
          <div class="" v-text="$i18n.t('index.support.credits')" />
          <div class="text-gray-50 px-2 py-1 mt-1 bg-gray-800 rounded-lg select-none" v-text="version" />
        </div>
      </template>
    </Section>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronRightIcon, DotsIcon, BrandFacebookIcon, BrandTwitterIcon, BrandRedditIcon } from 'vue-tabler-icons'
import { mapState } from 'pinia'
import Columns from '@/components/index/columns.vue'
import Section from '@/components/index/section.vue'
import ScheduleCard from '@/components/index/scheduleCard.vue'

import SupportButton from '~/components/socialButtons/supportButton.vue'
import { useMain } from '@/stores/index'

export default {
  name: 'PageHome',

  components: { Columns, Section, ScheduleCard, ScrollIcon: ChevronDownIcon, IconNext: ChevronRightIcon, IconDots: DotsIcon, SupportButton, AboutFacebook: BrandFacebookIcon, AboutTwitter: BrandTwitterIcon, AboutReddit: BrandRedditIcon },

  data () {
    return {
      loading: {
        mainText: false,
        screenshot: false
      },
      scroll: {
        fabObserver: null
      },
      section2: {
        selectedBoxIndex: 0,
        selectedBoxOrder: [1, 2, 1, 2, 1, 3],
        selectedBoxInterval: null
      },
      section3: {
        smallFeatures: [
          'customization', 'notifications', 'flexible', 'pwa', 'opensource', 'notrackers', 'noads',
          'clean', 'adaptiveticking', 'localization', 'darkmode', 'more'
        ],
        activeFeature: 4,
        activeFeatureInterval: null
      },
      faq: [
        { q: 'change_timers' },
        { q: 'will_it_help', hint: true },
        { q: 'data_collection' },
        { q: 'remember_settings', hint: true },
        { q: 'need_to_know' },
        { q: 'timer_style' }
      ],
      openfaq: 0,
      showFAB: false
    }
  },

  head () {
    return {
      title: 'AnotherPomodoro',
      link: [
        { rel: 'icon', href: '/favicon.svg' }
      ]
    }
  },

  computed: {
    section2selectedBox () {
      return this.section2.selectedBoxOrder[this.section2.selectedBoxIndex]
    },
    ...mapState(useMain, ['version'])
  },

  mounted () {
    this.$nextTick(() => {
      // Float in the app title and icon
      this.loading.mainText = true

      setTimeout(() => {
        // Float in the app screenshot
        this.loading.screenshot = true
      }, 1000)
    })

    // start animations
    this.selectedBoxInterval = setInterval(() => {
      this.section2.selectedBoxIndex = this.section2.selectedBoxIndex > 4 ? 0 : this.section2.selectedBoxIndex + 1
    }, 4000)

    this.activeFeatureInterval = setInterval(() => {
      this.section3.activeFeature = Math.floor(Math.random() * (this.section3.smallFeatures.length - 1))
    }, 3000)

    // register FAB scroll observer
    this.scroll.fabObserver = new IntersectionObserver(
      (entries) => {
        this.showFAB = !entries[0].isIntersecting
      },
      {
        root: this.$el,
        threshold: 1.0
      }
    ).observe(this.$refs.top)
  },

  beforeDestroy () {
    clearInterval(this.selectedBoxInterval)
    clearInterval(this.activeFeatureInterval)
    if (this.scroll.fabObserver) {
      this.scroll.fabObserver.disconnect()
    }
  },

  methods: {
    setIntersecting (value) {
      this.showFAB = value
    }
  }
}
</script>

<style lang="scss" scoped>
.fab-transition-enter,
.fab-transition-leave-to {
  @apply scale-0 opacity-0;
}

.main-appear-enter-active {
  @apply transition duration-1000;
}

.main-appear-enter {
  @apply opacity-0 -translate-x-4;
}
</style>
