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
        <div class="mx-2 cursor-pointer" @click="isShare">
          <font-awesome-icon :icon="['fas', 'share']" class="iconRemarks text-xl" />
          <span class="mx-1">Share</span>
        </div>
      </div>
      <div v-html="post.content" class="p-3">
        {{ post.content }}
      </div>
      <div class="commentsWrapper m-2">
        <div>
          Comments
          <span v-if="comments.length > 0">
            ( {{ comments.length }} )
          </span>
        </div>
        <div class="bg-white p-2 rounded my-2 flex flex-shrink-0 flex-wrap">
          <img src="../assets/logo.png" class="w-12 h-12 rounded-full"/>
          <div class="mx-4">
            <input type="text" placeholder="your name" class="px-2 py-2 placeholder-blueGray-300 text-black relative bg-white bg-white rounded text-sm border-2 shadow outline-none focus:outline-none focus:ring w-full" v-model="userComment.name"/>
            <TipTap class="text-black" v-model="userComment.content"/>
          </div>
        </div>
        <button @click="isComment" class="bg-pink-600 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
          Comment
        </button>
        <div v-if="comments.length > 0">
          <div v-for="(comment, index) in comments" :key="index" class="comments border p-2 my-2">
            <div class="flex flex-shrink-0">
              <font-awesome-icon :icon="['fab', 'the-red-yeti']" class="w-12 h-12 rounded-full text-5xl my-2"/>
              <div class="mx-2 p-2">
                <div class="font-semibold">
                {{comment.name}}
                </div>
                <div class="">
                  8 hrs Ago
                </div>
              </div>
            </div>
            <div v-html="comment.content" class="px-2">
              {{comment.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="allPosts" class="latestPosts bg-custom p-3 mx-3 max-w-md rounded-xl text-white my-2">
      <div class="font-extrabold text-xl mb-2">Lastest Posts</div>
      <div v-for="(post, index) in allPosts" :key="index" class="p-2 rounded-xl cursor-pointer hover:bg-pink-600 hover:text-white">
        {{post.title}}
        <div class="p-2">
          By Christopher
        </div>
      </div>
    </div>
    <div v-if="share" class="m-3 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-xs">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-custom">
          <!--body-->
          <div class="relative p-6 flex-auto max-w-xs">
            <div class="my-4 text-blueGray-500 text-lg leading-relaxed">
              <div class="relative">
                <div class="font-bold">
                  Share
                </div>
                <div class="absolute -top-14 -right-8 bg-black w-12 rounded-full h-12 flex items-center justify-center text-white mr-2 cursor-pointer" @click="isShare">
                  X
                </div>
              </div>
              <div class="social-btns flex flex-wrap flex-shrink-0">
                <ShareNetwork
                  network="twitter"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fab', 'twitter']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
                <ShareNetwork
                  network="facebook"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fab', 'facebook']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
                <ShareNetwork
                  network="whatsapp"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fab', 'whatsapp']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
                <ShareNetwork
                  network="instagram"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fab', 'instagram']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
                <ShareNetwork
                  network="telegram"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fab', 'telegram']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
                <ShareNetwork
                  network="linkedin"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fab', 'linkedin']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
                <ShareNetwork
                  network="pinterest"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fab', 'pinterest']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
                <ShareNetwork
                  network="email"
                  :url="articeLink"
                  :title="`${post.title}`"
                >
                  <font-awesome-icon :icon="['fas', 'envelope']" class="rounded-full p-2 bg-pink-600 text-white m-3 text-4xl" />
                </ShareNetwork>
              </div>
              <hr class="">
              <div class="input-link">
                <div class="font-bold">
                  Link
                </div>
                <div class="relative flex w-full flex-wrap items-stretch mb-3">
                  <input type="text" v-model="articeLink" id="articeLink" placeholder="Placeholder" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
                  <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <font-awesome-icon :icon="['fas', 'copy']" @click="copy" class="cursor-pointer text-pink-600" />
                  </span>
                </div>
                <div :class="copyLink ? 'copy' : ''">
                  <button @click="copy" class="bg-pink-600 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="share" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </article>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import TipTap from '@/components/TipTap'

export default {
  name: 'PublishedContent',
  components: {
    TipTap
  },
  data () {
    return {
      post: null,
      allPosts: [],
      share: false,
      articeLink: `${window.location.origin}${window.location.pathname}`,
      copyLink: false,
      comments: [],
      userComment: {
        name: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState([
      'baseURL'
    ])
  },
  async mounted () {
    const responseData = await axios.get(this.baseURL + '/blog-content/' + this.$route.params.id)
    // 611c967d78217710afeb2eb3
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
  },
  methods: {
    copy () {
      const copyText = document.querySelector('#articeLink')
      copyText.select()
      document.execCommand('copy')
      this.copyLink = true
      setTimeout(() => {
        this.copyLink = false
        this.share = !this.share
      }, 1200)
    },
    isShare () {
      this.share = !this.share
    },
    isComment () {
      this.comments.push(this.userComment)
      this.userComment = {
        content: '',
        name: ''
      }
    }
  }
}
</script>

<style lang="scss">
.copy {
  position: relative;
  ::before {
    content: 'Linked Copied';
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 5px;
    background: #19234d;
    padding: 4px;
    border-radius: 5px;
  }
  ::after {
    content: '';
    position: absolute;
    border-width: 10px;
    border-color: transparent transparent #19234d transparent;
    top: 75%;
    left: 25%;
  }
}
.latestPosts {
  height: 20rem;
  width: 80%;
  overflow: auto;
}
@media screen and (max-width: 600px) {
  .post-wrapper {
    flex-direction: column;
  }
  .iconRemarks {
    @apply text-2xl;
  }
}
</style>
