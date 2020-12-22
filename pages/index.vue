<template>
  <div>
    <section class="section-01">
      <h1>Another<b>Pomodoro</b></h1>
      <h2>Free Pomodoro timer right in your browser</h2>

      <!-- CTA -->
      <div class="mt-8">
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
      <div class="w-4/5 inline-block product-img" />

      <!-- Features here -->
      <div class="-mt-12 features-row-primary">
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
      <h1>
        What does it do?
      </h1>
      <div class="">
        If you watch too many videos of cats while you should be working instead, then <b>try it</b>.
      </div>
      <div class="my-4 inline-grid grid-cols-3 grid-flow-row gap-2 justify-center">
        <div class="bg-red-100 border-2 border-red-500 do-card">
          <h3 class="title">
            Work <span class="title-icon" role="none">1</span>
          </h3>
          <div>Time to get things done</div>
        </div>
        <div class="bg-yellow-100 border-2 border-yellow-500 do-card">
          <h3 class="title">
            Pause <span class="title-icon" role="none">2</span>
          </h3>
          <div>Watch a video, read an article, drink a coffee</div>
        </div>
        <div class="bg-blue-100 border-2 border-blue-500 do-card">
          <h3 class="title">
            Repeat <span class="title-icon"><icon-repeat role="none" /></span>
          </h3>
          <div>Do it again! A few more rounds and you'll get some extra rest!</div>
        </div>
      </div>

      <div>
        <b>AnotherPomodoro</b> helps you keep track of the time. Just start it and do what should be done!
      </div>
    </section>

    <section class="section section-04">
      <h1>
        Feature list
      </h1>
      <div class="grid grid-flow-row grid-cols-3 gap-5 feature-list">
        <div>Customization</div>
        <div>Audio &amp; Notifications </div>
        <div>Flexible</div>
        <div>Offline</div>
        <div>Open-source</div>
        <div>No trackers</div>
      </div>
    </section>

    <section class="section section-05 ">
      <h1>
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
      @apply bg-yellow-500;
    }
  }

  .section {
    & > h1:first-child {
      @apply uppercase font-bold;
    }
  }

  .section-01 {
    @apply relative text-white text-center pt-12 pb-32;

    background-color: rgb(255, 107, 107);
  }

  .section-02 {
    @apply -mt-32 relative text-center;
  }

  .section-03 {
    @apply text-center bg-orange-400 py-12 -mt-6;

    & > h1:first-child {
      @apply mt-12;
    }
  }

  .section-04 {
    @apply text-center bg-blue-400 py-12 -mt-6;
  }

  .section-05 {
    @apply text-center bg-gray-100 pt-12 pb-4 -mt-6;
  }

  .product-img {
    height: 450px;
    background-position: top center;
    background-repeat: no-repeat;
    background-image: url('/img/Screenshot-Main.png');
    background-size: cover;
  }

  .product-img::after {
    @apply w-full h-full block;

    content: '';
    background: linear-gradient(transparent 0%, transparent 50%, white 100%);
  }

  .feature-card {
    @apply border border-gray-400 border-solid bg-white p-4 shadow-md rounded-lg text-left;

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
    @apply grid grid-cols-3 gap-4 ml-auto mr-auto;

    width: max-content;
  }

  .feature-list {
    @apply text-lg mt-4;
  }

  .do-card {
    @apply p-4 rounded-lg text-left border-2;

    max-width: 300px;

    & > .title {
      @apply text-lg font-bold;

      & > .title-icon {
        @apply float-right ml-4 select-none;
      }
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

  head: {
    title: 'AnotherPomodoro'
  }
}
</script>
