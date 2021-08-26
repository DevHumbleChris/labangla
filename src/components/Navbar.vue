<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 Navbar">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <router-link to="/" class="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
          <font-awesome-icon :icon="['fab', 'the-red-yeti']" />
          LABANGLA
        </router-link>
        <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <router-link to="/feeds" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
              <font-awesome-icon :icon="['fas', 'book']" class="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
              <span class="ml-2">Feeds</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/new-post" class="px-3 py-2 flex items-center text-xs uppercase font-bold bg-blue-600 rounded leading-snug text-white hover:opacity-75">
              <font-awesome-icon :icon="['fas', 'plus']" class="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
              <span class="ml-2">Create Post</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss">
.Navbar {
  background: #212f67;
}
</style>
