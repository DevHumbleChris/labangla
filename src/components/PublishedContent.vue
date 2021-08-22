<template>
  <article class="post-wrapper my-2 flex flex-wrap flex-shrink-0 justify-center">
    <div v-if="post" class="post max-w-xl bg-custom text-white p-3 rounded-3xl mx-2">
      <img :src="`${baseURL}/image/${post.coverImage.filename}`" />
      <div class="font-extrabold text-2xl text-center">
        {{ post.title }}
      </div>
      <div class="flex justify-center">
        <div class="mx-2">
          6hrs Ago
        </div>
        <div class="mx-2">
          8 min read
        </div>
      </div>
      <div class="remarksBar flex p-3">
        <div class="mx-2">
          <font-awesome-icon :icon="['fas', 'heart']" class="iconRemarks" />
          <span class="mx-2">8</span>
        </div>
        <div class="mx-2" @click="shareViaWebShare">
          <font-awesome-icon :icon="['fas', 'share']" class="iconRemarks" />
          <span class="mx-1">8</span>
        </div>
        <div class="mx-2">
          <font-awesome-icon :icon="['fas', 'eye']" class="iconRemarks" />
          <span class="mx-1">8</span>
        </div>
      </div>
      <div v-html="post.content" class="p-3 mb-2">
        {{ post.content }}
      </div>
    </div>
    <!--<div class="max-w-sm bg-custom text-white p-3 rounded-2xl my-2">
      <div>
        <div>
          Trending Posts Love
        </div>
        <div>
        </div>
      </div>
      <div >
      </div>
    </div> -->
    <div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'PublishedContent',
  data () {
    return {
      post: null,
      allPosts: []
    }
  },
  computed: {
    ...mapState([
      'baseURL'
    ])
  },
  async mounted () {
    const responseData = await axios.get(this.baseURL + '/blog-content/' + this.$route.params.id)
    this.post = responseData.data.results
    const postsData = await axios.get(this.baseURL + '/all-posts/')
    this.allPosts = postsData.data.posts
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 480px) {
  .remarksBar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f1f5f8;
    color: #000;
    justify-content: center;
    align-items: center;
  }
  .iconRemarks {
    @apply text-2xl;
  }
}
</style>
