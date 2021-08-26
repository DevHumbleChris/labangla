<template>
  <section class="blogFeeds max-w-3xl m-auto">
    <div class="text-2xl font-bold text-pink-900 text-center">
      Labangla Blog Feeds
    </div>
    <div class="flex flex-wrap mx-2">
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white': openTab !== 1, 'text-white bg-pink-600': openTab === 1}">
              <i class="fas fa-space-shuttle text-base mr-1"></i> Feed
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white': openTab !== 2, 'text-white bg-pink-600': openTab === 2}">
              <i class="fas fa-cog text-base mr-1"></i> Top Latest
            </a>
          </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="px-4 py-5 flex-auto">
            <div v-if="feeds.length > 0 && latestFeeds.length > 0" class="tab-content tab-space">
              <div v-if="feeds" v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <router-link :to="`/post/${feed._id}`" v-for="feed in feeds" :key="feed._id" class="postWrapper flex flex-wrap flex-shrink-0 rounded-xl p-2 my-2">
                  <div class="max-w-sm">
                    <img :src="`${baseURL}/image/${feed.coverImage.filename}`" class="object-contain" />
                  </div>
                  <div class="max-w-xs p-4">
                    <div class="text-pink-600 text-xl font-bold">
                      {{ feed.title }}
                    </div>
                    <div v-if="feed.author" class="dec-font p-2 flex flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'the-red-yeti']" class="w-12 h-12 rounded-full text-5xl my-2"/>
                      <div class="p-2">
                        <div class="font-semibold">
                          <span class="font-extrabold text-xl">@</span>
                          {{ feed.author }}
                        </div>
                        <div class="flex">
                          <div class="mr-1">
                            <span>
                              {{ getTimeCreated(feed.dateCreated) }}
                            </span>
                            Ago
                          </div>
                          <div class="mr-1">
                            <span>
                              {{ getTimeRead(feed.content) }}
                            </span>
                            min read
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <div v-if="latestFeeds" v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <router-link :to="`/post/${feed._id}`" v-for="feed in latestFeeds" :key="feed._id" class="postWrapper flex flex-wrap flex-shrink-0 rounded-xl p-2 my-2">
                  <div class="max-w-sm">
                    <img :src="`${baseURL}/image/${feed.coverImage.filename}`" class="object-contain" />
                  </div>
                  <div class="max-w-xs p-4">
                    <div class="text-pink-600 text-xl font-bold">
                      {{ feed.title }}
                    </div>
                    <div v-if="feed.author" class="dec-font p-2 flex flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'the-red-yeti']" class="w-12 h-12 rounded-full text-5xl my-2"/>
                      <div class="p-2">
                        <div class="font-semibold">
                          <span class="font-extrabold text-xl">@</span>
                          {{ feed.author }}
                        </div>
                        <div class="flex">
                          <div class="mr-1">
                            <span>
                              {{ getTimeCreated(feed.dateCreated) }}
                            </span>
                            Ago
                          </div>
                          <div class="mr-1">
                            <span>
                              {{ getTimeRead(feed.content) }}
                            </span>
                            min read
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <div v-if="feeds.length <= 0 && latestFeeds.length <= 0" class="text-center">
              <div class="font-extrabold text-pink-900 text-2xl">
                No Blog Feeds Created
              </div>
              <p>
                Dive In And Create Yours Instantly,
                <router-link to="/new-post" class="font-semibold text-purple-600">
                  Create Post.
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'

export default {
  name: 'BlogFeeds',
  data () {
    return {
      openTab: 1,
      feeds: [],
      latestFeeds: []
    }
  },
  computed: {
    ...mapState([
      'baseURL'
    ])
  },
  methods: {
    toggleTabs (tabNumber) {
      this.openTab = tabNumber
    },
    getTimeCreated (time) {
      const timeCreated = formatDistanceToNow(new Date(time), {
        includeSeconds: true
      })
      return timeCreated
    },
    getTimeRead (content) {
      let timeRead = Math.floor(content.length / 267)
      if (timeRead === 0) {
        timeRead = 1
      }
      return timeRead
    }
  },
  async mounted () {
    try {
      const allPostFeeds = await axios.get(`${this.baseURL}/all-posts`)
      if (allPostFeeds.data.posts) {
        this.feeds = allPostFeeds.data.posts
      }
      const latestPostFeeds = await axios.get(`${this.baseURL}/latest-posts`)
      if (latestPostFeeds.data.posts) {
        this.latestFeeds = latestPostFeeds.data.posts
      }
    } catch (err) {
      alert(err.message)
    }
  }
}
</script>

<style>
.postWrapper {
  border: 1px solid grey;
  box-shadow: 0px 2px 4px #777;
}
.postWrapper:hover {
  border: 1px solid grey;
  cursor: pointer;
  box-shadow: 0px 6px 12px #777;
}

@media screen and (max-width: 320px) {
  .dec-font {
    font-size: 13px;
  }
}
</style>
