<template>
  <section class="Homepage">
    <article class="bg-white p-3 flex flex-wrap flex-shrink-0 my-2 mx-2 justify-center rounded-2xl">
      <div class="my-32 -dec-margin-top">
        <h3
          class="text-5xl font-bold text-pink-600 text-center"
          data-aos="zoom-in"
          data-aos-duration="2500"
        >
          Labangla
        </h3>
        <div
          class="p-2 text-center"
          data-aos="fade-left"
          data-aos-duration="2500"
        >
          <p class="text-xl">
            A community based blog site, that allows you to create blog with no hussle.
          </p>
          <p class="text-2xl font-semibold">
            Simple, easy and made with the right tools to get you started.
          </p>
          <router-link to="/new-post" class="btnSave bg-pink-900 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            <font-awesome-icon :icon="['fab', 'the-red-yeti']" />
            Get Started
          </router-link>
        </div>
      </div>
      <img
        src="../assets/images/Blog post-bro.png"
        alt="Blog post-bro" class="max-w-md"
        data-aos="slide-left"
        data-aos-duration="2500"
      />
    </article>
    <article class="bg-white p-3 my-2 mx-2 justify-center rounded-2xl">
      <h2
        class="text-center my-3 uppercase font-extrabold text-pink-900"
        data-aos="zoom-in"
        data-aos-duration="2500"
        dat-aos-delay="300"
      >
        Why you should be using Labangla.
      </h2>
      <div
        class="flex justify-center flex-wrap"
      >
        <div
          class="max-w-md my-28 mx-2 -dec-margin-top"
          data-aos="fade-right"
          data-aos-duration="2500"
          dat-aos-delay="300"
        >
          <h3 class="text-pink-600 font-bold text-2xl my-2">Made for the community.</h3>
          <div class="font-medium text-lg">
            The core principle of Labangla blog site is to bring the community together through blogging; thus providing every tool for the people to create a blog for the community.
          </div>
        </div>
        <img
          src="../assets/images/Social interaction-amico.png"
          alt="Social interaction-amico"
          class="max-w-md"
          data-aos="fade-left"
          data-aos-duration="2500"
          dat-aos-delay="300"
        />
      </div>
      <div class="flex justify-center flex-wrap reverse-flex">
        <img
          src="../assets/images/Interaction Design-rafiki.png"
          alt="Interaction Design-rafiki"
          class="max-w-md"
          data-aos="fade-right"
          data-aos-duration="2500"
          dat-aos-delay="300"
        />
        <div
          class="max-w-md my-28 mx-2 -dec-margin-top"
          data-aos="fade-left"
          data-aos-duration="2500"
          dat-aos-delay="300"
        >
          <h3 class="text-pink-600 font-bold text-2xl my-2">Minimal Setup.</h3>
          <div class="font-medium text-lg">
            No many configurations required to get you started.
          </div>
        </div>
      </div>
      <div class="flex justify-center flex-wrap">
        <div
          class="max-w-md my-28 mx-2 -dec-margin-top"
          data-aos="fade-right"
          data-aos-duration="2500"
          dat-aos-delay="300"
        >
          <h3 class="text-pink-600 font-bold text-2xl my-2">No passwords required.</h3>
          <div class="font-medium text-lg">
            Just simple, no passwords required. Forget all the login procedures required in every blog site out there.
          </div>
          <!-- <font-awesome-icon :icon="['fas', 'stop-sign']" /> -->
        </div>
        <img
          src="../assets/images/Mobile login-bro.png"
          alt="Mobile login-bro"
          class="max-w-md"
          data-aos="fade-left"
          data-aos-duration="2500"
          dat-aos-delay="300"
        />
      </div>
      <div class="flex justify-center flex-wrap reverse-flex">
        <img
          src="../assets/images/Share link-pana.png"
          alt="Share link-pana"
          class="max-w-md"
          data-aos="fade-right"
          data-aos-duration="2500"
          dat-aos-delay="300"
        />
        <div
          class="max-w-md my-28 mx-2 -dec-margin-top"
          data-aos="fade-left"
          data-aos-duration="2500"
          dat-aos-delay="300"
        >
          <h3 class="text-pink-600 font-bold text-2xl my-2">Engaging.</h3>
          <div class="font-medium text-lg">
            Share your created blog to top social platforms.
          </div>
          <!-- <font-awesome-icon :icon="['fas', 'stop-sign']" /> -->
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Homepage',
  mounted () {
    // this.SET_LOADING(true)
    setTimeout(() => {
      // this.SET_LOADING(false)
    }, 1000)
  },
  methods: {
    ...mapMutations([
      'SET_LOADING'
    ])
  }
}
</script>

<style lang="scss">
.Homepage {
  article {
    img {
      background: none;
      width: 100%;
    }

    @media screen and (max-width: 600px) {
      .-dec-margin-top {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .reverse-flex {
        flex-direction: column-reverse;
      }
    }
  }
}
</style>
