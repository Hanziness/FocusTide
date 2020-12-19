<template>
  <div>
    <section class="section-01">
      <h1>Another<b>Pomodoro</b></h1>
      <h2>Free Pomodoro timer right in your browser</h2>

      <!-- CTA -->
      <div class="mt-8">
        <nuxt-link to="/timer">
          <div
            class="bg-white text-black cta-button shadow-lg hover:bg-yellow-500"
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

    <section class="text-center section-02">
      <!-- Screenshot -->
      <div class="w-4/5 inline-block product-img" />

      <!-- Features here -->
      <div class="-mt-12 features-row-primary">
        <div class="feature-card">
          <h3 class="card-title">
            <span class="icon">💡</span> Focused, clean interface
          </h3>
          <div class="card-description">
            Just your timer, the essential controls and a bunch of customizations
          </div>
        </div>

        <div class="feature-card">
          <h3 class="card-title">
            <span class="icon">✔️</span> Nothing to install
          </h3>
          <div class="card-description">
            Runs in your browser, entirely offline after launch
          </div>
        </div>

        <div class="feature-card">
          <h3 class="card-title">
            <span class="icon">👋</span> Free &amp; open-source
          </h3>
          <div class="card-description">
            No hidden trackers, everyone can view and contribute to the code.
          </div>
        </div>
      </div>
    </section>

    <section class="section-03 text-center bg-orange-400 py-12 -mt-6">
      <h1 class="uppercase font-bold">
        What does it do?
      </h1>
      <div class="">
        If you watch too many videos of cats while you should be working instead, then <b>try it</b>.
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

  .section-01 {
    @apply relative text-white text-center pt-12 pb-32;

    background-color: rgb(255, 107, 107);
  }

  .section-02 {
    @apply -mt-32 relative;
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

</style>

<script>
export default {
  head: {
    title: 'AnotherPomodoro'
  }
}
</script>
