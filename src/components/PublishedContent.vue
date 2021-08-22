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
        <div class="mx-2">
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
    <div>
      <div class="m-3 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-sm">
          <!--content-->
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-custom">
            <!--body-->
            <div class="relative p-6 flex-auto max-w-sm">
              <div class="my-4 text-blueGray-500 text-lg leading-relaxed">
                <div class="font-bold">
                  Share
                </div>
                <div class="">
                </div>
                <hr class="">
                <div class="">
                  <div class="font-bold">
                    Link
                  </div>
                  <div class="">
                    <label>
                      <input type="text" class="p-1 my-2 px-2 bg-gray-100 rounded-2xl outline-none cursor-none" />
                      <span class="p-2 bg-gray-200 rounded">
                        <font-awesome-icon :icon="['fas', 'copy']"/>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
    // 612246d8ef74a30f7403f8ec
    if (!responseData.data.results) {
      this.$router.push({
        params: '0',
        name: 'Error404'
      })
    } else {
      this.post = responseData.data.results
      const postsData = await axios.get(this.baseURL + '/all-posts/')
      this.allPosts = postsData.data.posts
    }
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
