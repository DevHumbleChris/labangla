<template>
  <div class="m-4 my-4">
    <form method="POST" @submit.prevent="uploadImage" action="#" enctype="multipart/form-data">
      <input id="coverImage" type="file" ref="file" @change="onFileChange"/>
      <button type="submit" class="bg-pink-500 my-2 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ml-3">
        Upload Image
      </button>
    </form>
    <div v-if="imageInfo.filename && imageInfo.id">
      <img :src="`http://localhost:3000/image/${imageInfo.filename}`" />
      <button type="button" @click="removeImage" class="bg-pink-500 my-2 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ml-3">
        Delete Image
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Trial',
  data () {
    return {
      imageFile: '',
      imageInfo: {
        filename: '',
        id: ''
      }
    }
  },
  methods: {
    onFileChange () {
      this.imageFile = this.$refs.file.files[0]
    },
    async uploadImage () {
      try {
        const formData = new FormData()
        formData.append('file', this.imageFile)
        const responseData = await axios.post(
          'http://127.0.0.1:3000/upload-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        this.imageInfo = {
          filename: responseData.data.file.filename,
          id: responseData.data.file.id
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    async removeImage () {
      const responseData = await axios.delete(
        `http://127.0.0.1:3000/delete-image/${this.imageInfo.id}`
      )
      if (responseData.data.message) {
        setTimeout(() => {
          this.$refs.file.value = ''
          this.imageInfo = {
            filename: '',
            id: ''
          }
        }, 3000)
      }
    }
  }
}
</script>
