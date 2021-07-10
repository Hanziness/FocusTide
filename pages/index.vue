<template>
  <div>
    <section class="section section-01">
      <div class="w-max mx-auto">
        <h1 class="product-title">
          Another<b>Pomodoro</b>
        </h1>
        <h2 v-text="$i18n.t('index.app_description')" />
      </div>

      <!-- CTA -->
      <div class="cta-container grid-flow-row md:grid-flow-col">
        <nuxt-link to="/timer">
          <div
            class="cta-button cta-main"
            role="button"
            v-text="$i18n.t('index.cta.quickstart')"
          />
        </nuxt-link>
        <span class="mx-2" v-text="$i18n.t('index.cta.or')" />
        <nuxt-link to="/setup">
          <div class="cta-button cta-secondary" role="button" v-text="$i18n.t('index.cta.configure')" />
        </nuxt-link>
      </div>
    </section>

    <section class="section section-02">
      <!-- Screenshot -->
      <div class="container inline-block">
        <div ref="productImg" :class="['product-img', { 'bottom': !productImgTop }]" />
        <!-- <img :src="import('@/static/img/Screenshot-Main.png')"> -->
      </div>

      <div class="-mt-12 features-row-primary md:grid-flow-col">
        <div v-for="(feature, i) in features" :key="'feature-' + i" class="feature-card">
          <h3 class="card-title">
            <span class="icon"><component :is="feature.icon" :class="feature.iconClass" role="none" title="" /></span> {{ $i18n.t('index.features[' + i + '].title') }}
          </h3>
          <div class="card-description">
            {{ $i18n.t('index.features[' + i + '].description') }}
          </div>
        </div>
      </div>
    </section>

    <section class="section section-03">
      <h1 class="section-title mt-4 mb-2">
        {{ $i18n.t('index.section_03.title') }}
      </h1>

      <!-- Translations cause SSR vs Client rendering differences -->
      <client-only>
        <i18n path="index.section_03.subtitle" tag="div">
          <b>AnotherPomodoro</b>
        </i18n>
      </client-only>

      <div class="schedule-row">
        <div class="bg-red-100 border-red-400 do-card">
          <div class="content">
            <div class="title">
              {{ $i18n.t('index.section_03.cards[0].title') }} <span class="title-icon" role="none">1</span>
            </div>
            <div>{{ $i18n.t('index.section_03.cards[0].description') }}</div>
          </div>
          <div class="border-red-400 info" v-text="$i18n.t('index.section_03.cards[0].info')" />
        </div>
        <div class="bg-yellow-100 border-yellow-400 do-card">
          <div class="content">
            <div class="title">
              {{ $i18n.t('index.section_03.cards[1].title') }} <span class="title-icon" role="none">2</span>
            </div>
            <div v-text="$i18n.t('index.section_03.cards[1].description')" />
          </div>
          <div class="border-yellow-400 info" v-text="$i18n.t('index.section_03.cards[1].info')" />
        </div>
        <div class="bg-blue-100 border-blue-400 do-card">
          <div class="content">
            <div class="title">
              {{ $i18n.t('index.section_03.cards[2].title') }} <span class="title-icon"><icon-repeat role="none" title="" /></span>
            </div>
            <div v-text="$i18n.t('index.section_03.cards[2].description')" />
          </div>
        </div>
      </div>

      <i18n path="index.section_03.try_it.base" tag="div">
        <strong>{{ $i18n.t('index.section_03.try_it.try') }}</strong>
      </i18n>

      <h1 class="section-title my-4" v-text="$i18n.t('index.faq.title')" />

      <div class="mx-auto faq-container">
        <details v-for="(question, i) in faq" :key="'faq-' + i">
          <summary v-text="$i18n.t('index.faq.accordion.' + question.q +'.q')" />
          <div v-text="$i18n.t('index.faq.accordion.' + question.q + '.a')" />
          <div v-if="question.hint">
            <span class="hint" v-text="$i18n.t('index.faq.hint')" />
            {{ $i18n.t('index.faq.accordion.' + question.q + '.hint') }}
          </div>
        </details>
      </div>
    </section>

    <section class="section section-04">
      <h1 class="section-title" v-text="$i18n.t('index.section_04.title')" />
      <div class="container feature-list">
        <div v-for="(feature, i) in smallFeatures" :key="'smallFeature-' + i" v-text="$i18n.t('index.section_04.list.' + feature)" />
      </div>
    </section>

    <section class="section section-05 ">
      <h1 class="section-title" v-text="$i18n.t('index.section_05.title')" />
      <div class="mt-2">
        {{ $i18n.t('index.section_05.subtitle[0]') }} <br>
        <i18n path="index.section_05.subtitle[1].base">
          <b>{{ $i18n.t('index.section_05.subtitle[1].action') }}</b>
        </i18n>
      </div>
      <div class="support-icon-container">
        <!-- TODO For some reason, data-hint and aria-label are not updated after page render,
        leaving the tooltips in English regardless of the language selected -->
        <client-only>
          <a href="https://github.com/Hanziness/AnotherPomodoro" class="relative hint-left" rel="noopener" :aria-label="$i18n.t('index.section_05.support.github')">
            <div class="support-icon text-white bg-gray-900">
              <icon-github :size="42" title="" />
            </div>
          </a>
          <a href="https://www.buymeacoffee.com/imreg" class="relative hint-right" rel="noopener" :aria-label="$i18n.t('index.section_05.support.buymeacoffee')">
            <div class="support-icon bg-red-200">
              <img src="/img/BMC Logo - Black.svg" alt="Buy Me a Coffee! logo" style="width: 42px; height: 42px;">
            </div>
          </a>
        </client-only>
      </div>
      <div class="" v-text="$i18n.t('index.section_05.credits')" />
      <div class="version-number" v-text="$store.state.version" />
    </section>
  </div>
</template>

<script>
import IconLightBulb from 'vue-material-design-icons/LightbulbOn.vue'
import IconCheck from 'vue-material-design-icons/CheckBold.vue'
import IconHand from 'vue-material-design-icons/Handshake.vue'
import IconGithub from 'vue-material-design-icons/Github.vue'
import IconRepeat from 'vue-material-design-icons/Repeat.vue'

export default {
  name: 'PageIndex',
  components: {
    IconLightBulb, IconCheck, IconHand, IconGithub, IconRepeat
  },

  data () {
    return {
      productImgTop: true,
      productImgIntersection: null,
      features: [
        { icon: 'IconLightBulb', iconClass: 'text-yellow-500' },
        { icon: 'IconCheck', iconClass: 'text-green-600' },
        { icon: 'IconHand', iconClass: 'text-blue-600' }
      ],
      scheduleCards: [
        { bg: 'bg-red-100', border: 'border-red-400', info: true },
        { bg: 'bg-yellow-100', info: true },
        { bg: 'bg-blue-100', border: 'border-blue-400', info: false }
      ],
      faq: [
        { q: 'change_timers' },
        { q: 'will_it_help', hint: true },
        { q: 'data_collection' },
        { q: 'remember_settings', hint: true },
        { q: 'need_to_know' },
        { q: 'timer_style' }
      ],
      smallFeatures: [
        'customization', 'notifications', 'flexible', 'pwa', 'opensource', 'notrackers', 'noads',
        'clean', 'adaptiveticking', 'localization', 'darkmode', 'more'
      ]
    }
  },

  head () {
    return {
      title: 'AnotherPomodoro'
    }
  },

  mounted () {
    const thisRef = this

    this.productImgIntersection = new IntersectionObserver(
      function (entries, observer) {
        // scroll the image to bottom if its top is outside the viewport
        if (entries[0].boundingClientRect.top < 0) {
          thisRef.productImgTop = false
        } else {
          thisRef.productImgTop = true
        }
      },
      {
        threshold: [1]
        // rootMargin: '60px 0px 0px 0px'
      }
    )

    this.productImgIntersection.observe(this.$refs.productImg)
  },

  beforeDestroy () {
    this.productImgIntersection.disconnect()
  }
}
</script>

<style lang="scss" scoped>
h1 {
  @apply text-5xl;
}

h2 {
  @apply text-xl;
}

.section {
  @apply px-4;

  & > h1.section-title {
    @apply uppercase font-bold;
  }
}

.section-01 {
  @apply relative text-white text-center pt-12 pb-32 bg-gray-900;

  // This would not provide enough contrast with the white text:
  // background-color: rgb(255, 107, 107);

  & > .cta-container {
    @apply inline-grid gap-2 auto-cols-max mt-8 items-center;

    .cta-button {
      @apply text-3xl py-6 px-12 rounded-md inline-block select-none cursor-pointer uppercase font-bold;
    }

    .cta-main {
      @apply shadow-lg bg-yellow-300 text-black ;

      &:hover {
        @apply bg-yellow-400;
      }
    }

    .cta-secondary {
      @apply bg-gray-100 text-black;

      &:hover {
        @apply bg-gray-200;
      }
    }
  }
}

.section-02 {
  @apply -mt-24 relative text-center;
}

.section-03 {
  @apply text-center bg-yellow-400 py-12 -mt-6;

  // & > h1:first-child {
  //   @apply mt-12;
  // }

  .schedule-row {
    @apply my-6 inline-grid grid-cols-3 grid-flow-row gap-2 md:gap-4 justify-center max-w-screen-lg;
  }
}

.section-04 {
  @apply text-center bg-blue-600 text-white py-12 -mt-6;
}

.section-05 {
  @apply text-center bg-gray-100 pt-12 pb-4;

  .version-number {
    @apply inline-block rounded-lg bg-gray-900 text-white p-1 px-2 text-sm mt-1 mb-2 select-none;
  }

  .support-icon-container {
    @apply my-4 inline-grid auto-cols-max grid-flow-col gap-2;

    .support-icon {
      @apply p-1 rounded-full block relative z-10;
    }
  }
}

.hint::before {
  @apply px-4 rounded-full absolute h-full hidden bg-gray-200 top-0 w-max z-0 border border-gray-300 items-center;

  content: attr(aria-label);
}

.hint:hover::before {
  @apply grid;
}

.hint-right::before {
  @extend .hint::before;

  @apply pl-8 rounded-l-none left-1/2;
}

.hint-left::before {
  @extend .hint::before;

  @apply pr-8 rounded-r-none right-1/2;
}

.product-img {
  @apply w-full inline-block;

  height: 500px;
  background-position-x: center;
  background-position-y: 10%;
  background-repeat: no-repeat;
  background-image: url('~@/assets/img/Screenshot-Main.png');
  background-size: cover;
  transition: background-position 300ms ease-in-out;

  &::after {
    @apply w-full h-full block;

    content: '';
    background: linear-gradient(transparent 0%, transparent 50%, white 100%);
  }

  &.bottom {
    background-position-y: 95%;
  }
}

.feature-card {
  @apply border border-gray-300 border-solid bg-white p-4 shadow-md rounded-lg text-left;

  // max-width: 300px;
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;

  & > .card-title {
    @apply text-lg mb-2;

    & > .icon {
      @apply float-right select-none;
    }
  }

  & > .card-description {
    @apply text-gray-700;
  }

  &:hover {
    @apply shadow-xl;

    transform: translateY(-10px);
  }
}

.features-row-primary {
  @apply grid gap-4 ml-auto mr-auto md:grid-flow-col md:grid-cols-3 max-w-full lg:max-w-screen-lg;

  width: max-content;
}

.faq-container {
  @apply text-left rounded-lg overflow-hidden border divide-gray-200 divide-solid divide-y-2 max-w-screen-lg;

  & > details {
    @apply bg-gray-100;

    & > summary {
      @apply p-3 font-bold cursor-pointer;

      // disable extra outline in Chromium based browsers when item is focused
      &:focus {
        outline: none;
      }
    }

    & > * {
      @apply p-3 pt-0;
    }

    & ul {
      @apply mt-1 ml-4;

      & > li::before {
        @apply mr-1;

        content: "-";
      }
    }

    // :first-of-type
    // & > div {
    //   @apply mt-2;
    // }

    & span.hint {
      @apply bg-green-700 rounded-md px-1 text-white font-bold uppercase;
    }

    & span.emph {
      @apply text-green-700 font-bold;
    }
  }
}

.feature-list {
  @apply text-lg mt-4 grid grid-flow-row grid-cols-3 gap-5 ml-auto mr-auto max-w-screen-lg;
}

.do-card {
  @apply rounded-lg text-left border-2 grid content-between shadow-md;

  & > .content {
    @apply p-4;

    & > .title {
      @apply text-lg font-bold;

      & > .title-icon {
        @apply float-right ml-4 select-none;
      }
    }
  }

  & > .info {
    @apply px-4 py-2 italic text-opacity-75 border-t-2;
  }
}
</style>
