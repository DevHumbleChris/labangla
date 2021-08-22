<template>
  <section class="Homepage border shadow mt-10 p-3">
    <div class="text-purple-900 mt-4 text-center">
      Vue Simple Blog
    </div>
    <div class="text-center my-3">
      <button class="border-0 p-2 text-white bg-purple-600 rounded">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Create Story
      </button>
      <div class="my-2">
        Today:
        <span>
          Thursday
        </span>
      </div>
      <div class="my-1">
        Created Blogs:
        <span>0</span>
      </div>
    </div>
    <div class="blogs m-3">
      <div class="my-3 shadow bg-white p-4">
        <div>Story Header</div>
        <div class="p-2">
          Every person has a great story to share with the world. Speak it out to the world by worlds. Aspire to inspire. Welcome to iWrite, where you get not to be judge to what you got to say to the world.
        </div>
      </div>
      <div class="my-3 shadow bg-white p-4">
        <div>Story Header</div>
        <div class="p-2">
          Every person has a great story to share with the world. Speak it out to the world by worlds. Aspire to inspire. Welcome to iWrite, where you get not to be judge to what you got to say to the world.
        </div>
      </div>
    </div>
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
  width: 30rem;
  margin: auto;
  background: #f1f5f8;
}
</style>
