<template>
  <div>
    <div v-if="showModal" class="m-3 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
              Are You Ready To Publish ? If In Doubts, You Can Preview Your Content Before Publishing.
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="yesPublish">
              Yes
            </button>
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AlertModal',
  computed: {
    ...mapState([
      'showModal',
      'editContent',
      'baseURL'
    ])
  },
  methods: {
    ...mapMutations([
      'SHOW_MODAL',
      'SET_DEFAULT'
    ]),
    toggleModal () {
      this.SHOW_MODAL()
    },
    async yesPublish () {
      this.SHOW_MODAL()
      const responseData = await axios.post(
        this.baseURL + '/post-content',
        this.editContent
      )
      const { _id } = responseData.data.results
      // const titleString = title.split(' ').join('-')
      // console.log(titleString)
      localStorage.removeItem('editContent')
      this.SET_DEFAULT()
      this.$router.push({
        name: 'Post',
        params: {
          id: _id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.bg-custom {
  background: #212f67;
}
</style>
