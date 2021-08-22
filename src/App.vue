<template>
  <div id="app">
    <div v-if="load">
      <LoadSpinner />
    </div>
    <div v-else>
      <Navbar />
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import LoadSpinner from '@/components/LoadSpinner.vue'

export default {
  components: {
    Navbar,
    LoadSpinner
  },
  computed: {
    ...mapState([
      'load'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_LOADING'
    ])
  },
  mounted () {
    this.SET_LOADING(true)
    setTimeout(() => {
      this.SET_LOADING(false)
    }, 5500)
  }
}
</script>

<style lang="scss">
#app {
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
