<template>
  <article class="CreatePost relative" @click="createPost">
    <div>
      <div v-if="showModal" class="mx-2 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <!--header-->
            <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 class="text-3xl font-semibold">
                Quick Guide On Using The Editor.
              </h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto">
              <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                By default the Editor is enabled with <span class="text-pink-600">Markdown Shortcuts</span>, that makes it easy to format the text while typing.
              </p>
              <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                To test that, start a new line and type <span class="text-pink-600">#</span> followed by a space to get a <span class="text-blue-600">heading</span>. Try <span class="text-pink-600">#</span>, <span class="text-pink-600">##</span>, <span class="text-pink-600">###</span>, <span class="text-pink-600">####</span>, <span class="text-pink-600">#####</span>, <span class="text-pink-600">######</span> for different levels.
              </p>
              <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                Try <span class="text-pink-600">></span> for <span class="text-blue-600">blockquotes</span>, <span class="text-pink-600">*</span>, <span class="text-pink-600">-</span> or <span class="text-pink-600">+</span> for <span class="text-blue-600">bullet list</span>, <span class="text-pink-600">1</span> for <span class="text-blue-600">ordered list</span> or <span class="text-pink-600">`foobar`</span> to <span class="text-blue-600"> highlight code </span>, <span class="text-pink-600">~~tildes~~</span> to <span class="text-blue-600">strike text</span>, or <span class="text-pink-600">==equal signs==</span> to <span class="text-blue-600">highlight text</span>.
              </p>
              <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                In addition, we have added the Typography extension here. Try typing
                <span class="text-blue-600">(c)</span>
                to see how it’s converted to a proper
                <span class="text-pink-600">©</span>
                character. You can also try <span class="text-blue-600">-></span>, <span class="text-blue-600">>></span>, <span class="text-blue-600">1/2</span>, <span class="text-blue-600">!=</span>, or <span class="text-blue-600">--</span>.
              </p>
            </div>
            <!--footer-->
            <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
    <div v-if="save" class="flex">
      <div class="flex">
        <hollow-dots-spinner
        :animation-duration="1000"
        :dot-size="10"
        :dot-sum="3"
        :color="`#212f67`"
        />
        <span class="text-sm">Saving</span>
      </div>
    </div>
    <div class="flex flex-wrap max-w-2xl mr-2">
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white': openTab !== 1, 'text-white bg-pink-600': openTab === 1}">
              <font-awesome-icon :icon="['fas', 'pen']" class="text-base mr-1" />
              Edit
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white': openTab !== 2, 'text-white bg-pink-600': openTab === 2}">
              <font-awesome-icon :icon="['fas', 'eye']" class="fas fa-space-shuttle text-base mr-1" />
              Preview
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white': openTab !== 3, 'text-white bg-pink-600': openTab === 3}">
              <font-awesome-icon :icon="['fas', 'book']" class="fas fa-space-shuttle text-base mr-1" />
              Editor Guidance
            </a>
          </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mr-2">
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <div class="postWrapper p-3">
                  <div class="my-2">
                    <form v-if="!postContent.coverImage.filename && !postContent.coverImage.id" method="POST" enctype="multipart/form-data">
                      <hollow-dots-spinner
                        v-if="load"
                        :animation-duration="1000"
                        :dot-size="15"
                        :dot-sum="3"
                        :color="`#212f67`"
                      />
                      <div v-else>
                        <label for="coverImage" class="p-3 border rounded" :disabled="load">
                          Add Cover Image
                        </label>
                        <input id="coverImage" type="file" ref="file" hidden @change="OnFileChange"/>
                        <span v-if="error === 0" class="block mt-3 text-sm text-red-600">* {{ requiredError[error] }}</span>
                      </div>
                    </form>
                    <div v-else>
                      <div class="rounded-2xl max-w-xs">
                        <img :src="`${baseURL}/image/${postContent.coverImage.filename}`" :alt="postContent.coverImage.filename" />
                      </div>
                      <button @click="removeImage(postContent.coverImage.id)" class="bg-pink-500 my-2 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <div v-if="removeLoad" class="flex">
                          <hollow-dots-spinner
                          :animation-duration="1000"
                          :dot-size="15"
                          :dot-sum="3"
                          :color="`#212f67`"
                          />
                          Removing
                        </div>
                        <div v-else>
                          <font-awesome-icon :icon="['fas', 'trash']" />
                          Remove
                        </div>
                      </button>
                    </div>
                  </div>
                  <div class="my-6">
                    <input type="text" v-model="postContent.title" class="title text-5xl outline-none focus:outline-none" placeholder="New post title here..." />
                    <span v-if="error === 1" class="block text-sm text-red-600">* {{ requiredError[error] }}</span>
                  </div>
                  <div class="my-2">
                    <input type="text" v-model="postContent.author" class="tags text-lg outline-none focus:outline-none" placeholder="enter your name" />
                    <span v-if="error === 2" class="block text-sm text-red-600">* {{ requiredError[error] }}</span>
                  </div>
                  <TipTap v-model="newContent" class="focus:border-red-500" />
                  <span v-if="error === 3" class="block text-sm text-red-600">* {{ requiredError[error] }}</span>
                </div>
              </div>
              <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <div v-if="postContent.coverImage.filename && postContent.coverImage.id" class="bg-gray-400 rounded-2xl">
                  <img :src="`${baseURL}/image/${postContent.coverImage.filename}`" :alt="postContent.coverImage.filename" class="rounded-2xl object-contain" />
                </div>
                <div v-if="load" class="flex flex-wrap">
                  <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="15"
                  :dot-sum="3"
                  :color="`#212f67`"
                  />
                  Cover Image
                </div>
                <div v-if="removeLoad" class="flex flex-wrap my-2">
                  <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="15"
                  :dot-sum="3"
                  :color="`#212f67`"
                  />
                  Removing Cover Image
                </div>
                <div v-if="postContent.title" class="text-3xl font-bold text-center my-3">
                  {{ postContent.title }}
                </div>
                <div v-if="postContent.author" class="p-2 flex flex-shrink-0">
                  <font-awesome-icon :icon="['fab', 'the-red-yeti']" class="w-12 h-12 rounded-full text-5xl my-2"/>
                  <div class="p-2">
                    <div class="font-semibold">
                      <span class="font-extrabold text-xl">@</span>
                      {{ postContent.author }}
                    </div>
                    <div class="flex">
                      <div class="mr-2">
                        {{ getTimeCreated() }}
                      </div>
                      <div class="mr-2">
                        <span>
                          {{ getTimeRead }}
                        </span>
                        min read
                      </div>
                      <div class="mr-2 cursor-pointer">
                        <font-awesome-icon :icon="['fas', 'share']" class="iconRemarks text-xl" />
                        <span class="mx-1">Share</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="postContent.content" v-html="postContent.content" class="p-5">
                  {{ postContent.content }}
                </div>
              </div>
              <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <h3 class="text-3xl font-semibold text-center">
                  Quick Guide On Using The Editor.
                </h3>
                <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                  By default the Editor is enabled with <span class="text-pink-600">Markdown Shortcuts</span>, that makes it easy to format the text while typing.
                </p>
                <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                  To test that, start a new line and type <span class="text-pink-600">#</span> followed by a space to get a <span class="text-blue-600">heading</span>. Try <span class="text-pink-600">#</span>, <span class="text-pink-600">##</span>, <span class="text-pink-600">###</span>, <span class="text-pink-600">####</span>, <span class="text-pink-600">#####</span>, <span class="text-pink-600">######</span> for different levels.
                </p>
                <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Try <span class="text-pink-600">></span> for <span class="text-blue-600">blockquotes</span>, <span class="text-pink-600">*</span>, <span class="text-pink-600">-</span> or <span class="text-pink-600">+</span> for <span class="text-blue-600">bullet list</span>, <span class="text-pink-600">1</span> for <span class="text-blue-600">ordered list</span> or <span class="text-pink-600">`foobar`</span> to <span class="text-blue-600"> highlight code </span>, <span class="text-pink-600">~~tildes~~</span> to <span class="text-blue-600">strike text</span>, or <span class="text-pink-600">==equal signs==</span> to <span class="text-blue-600">highlight text</span>.
                </p>
                <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                  In addition, we have added the Typography extension here. Try typing
                  <span class="text-blue-600">(c)</span>
                  to see how it’s converted to a proper
                  <span class="text-pink-600">©</span>
                  character. You can also try <span class="text-blue-600">-></span>, <span class="text-blue-600">>></span>, <span class="text-blue-600">1/2</span>, <span class="text-blue-600">!=</span>, or <span class="text-blue-600">--</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-4">
      <button @click="publish" :class="postContent.content === '' &&  postContent.title === '' ? 'disabled btnSave text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150': 'btnSave text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'" :disabled="postContent.content === '' &&  postContent.title === ''">
        <font-awesome-icon :icon="['fab', 'the-red-yeti']" />
        Publish
      </button>
      <button v-if="postContent.content || postContent.title || this.postContent.coverImage.id" @click="revertChanges" class="bg-pink-600 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
        <font-awesome-icon :icon="['fas', 'undo']" />
        Revert Changes
      </button>
      <AlertModal />
    </div>
  </article>
</template>

<script>
import TipTap from '@/components/TipTap.vue'
import { HollowDotsSpinner } from 'epic-spinners'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import { formatDistanceToNow } from 'date-fns'
import AlertModal from '@/components/AlertModal.vue'

export default {
  name: 'CreatePost',
  components: {
    TipTap,
    HollowDotsSpinner,
    AlertModal
  },
  data () {
    return {
      newContent: '',
      openTab: 1,
      load: false,
      removeLoad: false,
      postContent: {
        coverImage: {
          filename: '',
          id: ''
        },
        title: '',
        author: '',
        content: ''
      },
      showModal: false,
      revertChangesModal: false,
      requiredError: [
        'Cover Image Required',
        'Title Required',
        'Author Name Required',
        'Content Required'
      ],
      error: null
    }
  },
  watch: {
    newContent () {
      if (this.newContent) {
        this.postContent.content = this.newContent
        this.SET_CONTENT(this.postContent)
      }
      this.getTimeCreated()
    },
    author () {
      if (this.postContent.author) {
        this.SET_CONTENT(this.postContent)
      }
    },
    titleWatcher () {
      if (this.postContent.title) {
        this.SET_CONTENT(this.postContent)
      }
    },
    coverImageWatcher () {
      this.SET_CONTENT(this.postContent)
    }
  },
  computed: {
    ...mapState([
      'editContent',
      'save',
      'baseURL'
    ]),
    author () {
      const author = this.postContent.author
      return author
    },
    titleWatcher () {
      const title = this.postContent.title
      return title
    },
    coverImageWatcher () {
      const coverImage = this.postContent.coverImage
      return coverImage
    },
    getTimeRead () {
      let timeRead = Math.floor(this.postContent.content.length / 267)
      if (timeRead === 0) {
        timeRead = 1
      }
      return timeRead
    }
  },
  methods: {
    ...mapMutations([
      'REMOVE_IMAGES',
      'SET_CONTENT',
      'SHOW_MODAL'
    ]),
    getTimeCreated () {
      const time = Date.now()
      const timeCreated = formatDistanceToNow(new Date(time), {
        includeSeconds: true
      })
      return timeCreated
    },
    toggleTabs (tabNumber) {
      this.openTab = tabNumber
    },
    toggleModal () {
      this.showModal = !this.showModal
    },
    createPost () {
      this.showModal = false
    },
    OnFileChange () {
      const file = this.$refs.file.files[0]
      this.createImage(file)
    },
    async createImage (file) {
      try {
        const formData = new FormData()

        formData.append('file', file)
        const responseData = await axios.post(
          this.baseURL + '/upload-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (responseData.data.file) {
          this.load = true
          setTimeout(() => {
            this.postContent.coverImage = {
              filename: responseData.data.file.filename,
              id: responseData.data.file.id
            }
            this.load = false
          }, 2500)
        }
      } catch (err) {
        alert(err.message)
      }
    },
    async removeImage (id) {
      const responseData = await axios.delete(`${this.baseURL}/delete-image/${id}`)

      if (responseData.data.message) {
        this.removeLoad = true
        setTimeout(() => {
          this.postContent.coverImage = {
            filename: '',
            id: ''
          }
          this.removeLoad = false
        }, 2500)
      }
    },
    revertChanges () {
      this.newContent = ''
      this.postContent.title = ''
      this.postContent.author = ''
      this.postContent.content = ''

      if (this.postContent.coverImage.id) {
        this.removeImage(this.postContent.coverImage.id)
      }
      this.REMOVE_IMAGES()
      localStorage.removeItem('editContent')
    },
    publish () {
      if (!this.postContent.coverImage.filename) {
        this.toggleError(0)
      } else if (!this.postContent.content) {
        this.toggleError(3)
      } else if (!this.postContent.author) {
        this.toggleError(2)
      } else if (!this.postContent.title) {
        this.toggleError(1)
      } else {
        this.SHOW_MODAL()
      }
    },
    toggleError (errorNo) {
      this.error = errorNo
      setTimeout(() => {
        this.error = -1
      }, 2000)
    }
  },
  mounted () {
    this.showModal = true
    if (this.editContent.content || this.editContent || this.editContent.title) {
      this.newContent = this.editContent.content
      this.postContent = this.editContent
    }
  }
}
</script>

<style lang="scss">
.disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
.CreatePost {
  margin-top: 40px;
  margin-left: 30px;

  .post {
    border: 1px solid black;
  }

  a {
    cursor: pointer;
  }

  form label {
    cursor: pointer;
    border: 1px solid black;
  }

  .title {
    width: 100%;

    :focus {
      border: none;
    }

    @media screen and (max-width: 480px) {
      @apply text-2xl;
    }
    @media screen and (min-width: 600px) {
      @apply text-4xl;
    }
    @media screen and (min-width: 720px) {
      @apply text-5xl;
    }
    @media screen and (min-width: 1200px) {
      @apply text-5xl;
    }
  }

  .btnSave {
    background: #212f67;
  }

  .coverImageWrapper {
    align-items: center;
    justify-content: center;
  }
}
</style>
