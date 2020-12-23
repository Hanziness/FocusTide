<template>
  <div>
    <section class="section section-01">
      <h1 class="product-title">
        Another<b>Pomodoro</b>
      </h1>
      <h2>
        Free Pomodoro timer right in your browser
      </h2>

      <!-- CTA -->
      <div class="cta-container grid-flow-row md:grid-flow-col">
        <nuxt-link to="/timer">
          <div
            class="bg-white text-black cta-button cta-main"
          >
            Quickstart
          </div>
        </nuxt-link>
        <span class="mx-2">or</span>
        <div class="bg-gray-300 text-black cta-button">
          Configure
        </div>
      </div>
    </section>

    <section class="section section-02">
      <!-- Screenshot -->
      <div class="container inline-block">
        <div ref="productImg" :class="['product-img', { 'bottom': !productImgTop }]" />
      </div>

      <!-- Features here -->
      <div class="-mt-12 features-row-primary md:grid-flow-col">
        <div class="feature-card">
          <h3 class="card-title">
            <span class="icon"><icon-light-bulb class="text-yellow-500" /></span> Focused, clean interface
          </h3>
          <div class="card-description">
            Just your timer, the essential controls and a bunch of customizations
          </div>
        </div>

        <div class="feature-card">
          <h3 class="card-title">
            <span class="icon"><icon-check class="text-green-600" /></span> Nothing to install
          </h3>
          <div class="card-description">
            Runs in your browser, entirely offline after launch
          </div>
        </div>

        <div class="feature-card">
          <h3 class="card-title">
            <span class="icon"><icon-hand class="text-blue-600" /></span> Free &amp; open-source
          </h3>
          <div class="card-description">
            No hidden trackers, everyone can view and contribute to the code.
          </div>
        </div>
      </div>
    </section>

    <section class="section section-03">
      <h1 class="section-title">
        What does it do?
      </h1>
      <div>
        <b>AnotherPomodoro</b> helps you keep track of your time. Just work or take a break when it says so.
      </div>

      <div class="my-4 inline-grid grid-cols-3 grid-flow-row gap-2 justify-center">
        <div class="bg-red-100 border-red-400 do-card">
          <div class="content">
            <h3 class="title">
              Work <span class="title-icon" role="none">1</span>
            </h3>
            <div>Time to get things done</div>
          </div>
          <div class="border-t-2 border-red-400 info">
            25 minutes
          </div>
        </div>
        <div class="bg-yellow-100 border-yellow-400 do-card">
          <div class="content">
            <h3 class="title">
              Pause <span class="title-icon" role="none">2</span>
            </h3>
            <div>Watch a video, read an article, drink a coffee</div>
          </div>
          <div class="border-t-2 border-yellow-400 info">
            5-15 minutes
          </div>
        </div>
        <div class="bg-blue-100 border-blue-400 do-card">
          <div class="content">
            <h3 class="title">
              Repeat <span class="title-icon"><icon-repeat role="none" /></span>
            </h3>
            <div>Do it again! A few more rounds and you'll get some extra rest!</div>
          </div>
        </div>
      </div>
      <div class="">
        If you watch too many videos of cats while you should be working instead, then <b>give it a try</b>.
      </div>

      <h1 class="section-title mt-4 mb-3">
        FAQ
      </h1>

      <div class="mx-auto container faq-container text-left">
        <details>
          <summary>Can I change those timers?</summary>
          <div>
            Absolutely! You can change the <em>work</em>, <em>pause</em> and <em>long pause</em> timers to whatever you want! You can also change how frequent <em>long pauses</em> are!
          </div>
        </details>
        <details>
          <summary>Will this app help me?</summary>

          <div>
            That depends on you. This app tries hard to create a motivating environment with its clean design and flexibility, but it's up to you whether you follow the schedule it gives you.
          </div>
          <div>
            <span class="hint">Hint</span> If you realize you can't work 25 minutes straight or a break of 5 minutes is too short, adjust them to something more comfortable. Don't give up, follow a more relaxed schedule and progressively go stricter.
          </div>
        </details>
        <details>
          <summary>Does it collect any data?</summary>
          <div>
            <span class="emph">Nope!</span> The app runs only in your browser, no data is being collected or sent anywhere!
          </div>
        </details>
        <details>
          <summary>How will it remember my settings then?</summary>
          <div>
            It relies on your browser to do that. If you clear your browser data, the app's settings will revert to their defaults, too.
          </div>
          <div class="">
            <span class="hint">HINT</span> If you want to keep your settings, don't use the app in private browsing (incognito mode).
          </div>
        </details>
        <details>
          <summary>So what do I need to use this?</summary>
          <div>
            <div>
              Absolutely nothing. If you don't want to delve into the settings, just start the timer and listen for the audio chime when it finishes. Once it's done, start the next timer when you're ready.
            </div>
            <div>
              No knowledge is necessary to use this timer, just pay attention to the time left!
            </div>
          </div>
        </details>
        <details>
          <summary>Which timer style should I use?</summary>
          <div>
            <div>
              That depends on how obscure you want the timer to be. If you want seconds-precision, go for the <em>traditional</em>, if you're fine with minutes, go for <em>approximate</em>. If that's still too precise, how about the <em>percentage</em> one? That only shows you the fraction of time elapsed (eg. 80% if you have a 25-minute session and you're done with 20 minutes). Hopefully that will prevent you from thinking about how many more minutes you have to work for!
            </div>
          </div>
        </details>
      </div>
    </section>

    <section class="section section-04">
      <h1 class="section-title">
        Feature list
      </h1>
      <div class="container feature-list">
        <div>Customization</div>
        <div>Audio &amp; Notifications </div>
        <div>Flexible</div>
        <div>Offline</div>
        <div>Open-source</div>
        <div>No trackers</div>
      </div>
    </section>

    <section class="section section-05 ">
      <h1 class="section-title">
        Support this project
      </h1>
      <div class="">
        AnotherPomodoro is being developed as a side project with no compensation in mind. <br>
        If you feel that this is a project worth supporting, please <b>do so</b>.
      </div>
      <div class="text-xl mt-4 inline-grid auto-cols-max grid-flow-col gap-2">
        <a href="https://github.com/Hanziness/AnotherPomodoro" target="_blank" aria-label="View on GitHub">
          <div class="p-1 text-white bg-gray-900 rounded-full inline-block">
            <icon-github :size="42" title="" />
          </div>
        </a>
        <a href="https://www.buymeacoffee.com/imreg" target="_blank" aria-label="Buy me a coffee!">
          <div class="p-1 bg-red-300 rounded-full inline-block">
            <img src="/img/BMC Logo - Black.svg" style="width: 42px; height: 42px;">
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    @apply text-5xl;
  }

  h2 {
    @apply text-xl;
  }

  .cta-button {
    @apply text-3xl py-6 px-12 rounded-md inline-block select-none cursor-pointer uppercase font-bold;
  }

  .cta-main {
    @apply shadow-lg;

    &:hover {
      @apply bg-yellow-300;
    }
  }

  .section {
    @apply px-4;

    & > h1.section-title {
      @apply uppercase font-bold;
    }
  }

  .section-01 {
    @apply relative text-white text-center pt-12 pb-32;

    background-color: rgb(255, 107, 107);

    & > .cta-container {
      @apply inline-grid gap-2 auto-cols-max mt-8 items-center;
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
  }

  .section-04 {
    @apply text-center bg-blue-300 py-12 -mt-6;
  }

  .section-05 {
    @apply text-center bg-gray-100 pt-12 pb-4;
  }

  .product-img {
    @apply w-full inline-block;

    height: 500px;
    background-position-x: center;
    background-position-y: 10%;
    background-repeat: no-repeat;
    background-image: url('/img/Screenshot-Main.png');
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

    max-width: 300px;
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
    @apply grid gap-4 ml-auto mr-auto;

    width: max-content;
  }

  .faq-container {
    & > details {
      @apply border p-3 bg-gray-100;

      &:first-child {
        @apply rounded-t-lg;
      }

      &:last-child {
        @apply rounded-b-lg;
      }

      & > summary {
        @apply font-bold;
      }

      & > div:first-child {
        @apply mt-2;
      }

      & span.hint {
        @apply bg-green-700 rounded-md px-1 text-white font-bold uppercase;
      }

      & span.emph {
        @apply text-green-700 font-bold;
      }
    }
  }

  .feature-list {
    @apply text-lg mt-4 grid grid-flow-row grid-cols-3 gap-5 ml-auto mr-auto;
  }

  .do-card {
    @apply rounded-lg text-left border-2 grid content-between shadow-md;

    max-width: 300px;

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
      @apply px-4 py-2 italic text-opacity-75;
    }
  }
</style>

<script>
import IconLightBulb from 'vue-material-design-icons/LightbulbOn.vue'
import IconCheck from 'vue-material-design-icons/CheckBold.vue'
import IconHand from 'vue-material-design-icons/Handshake.vue'
import IconGithub from 'vue-material-design-icons/Github.vue'
import IconRepeat from 'vue-material-design-icons/Repeat.vue'

export default {
  components: {
    IconLightBulb, IconCheck, IconHand, IconGithub, IconRepeat
  },

  data () {
    return {
      productImgTop: true,
      productImgIntersection: null
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
  },

  head: {
    title: 'AnotherPomodoro'
  }
}
</script>
