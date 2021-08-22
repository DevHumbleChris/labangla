import axios from 'axios'

export default {
  SET_CONTENT (state, payload) {
    if (state.editContent) {
      state.editContent = payload
      localStorage.setItem('editContent', JSON.stringify(state.editContent))
      state.save = true
      setTimeout(() => {
        state.save = false
      }, 1000)
    }
  },
  SET_LOADING (state, payload) {
    if (state.editContent) {
      state.load = payload
    }
  },
  SET_IMAGES (state, payload) {
    if (state.editContent) {
      state.images = payload
    }
  },
  async REMOVE_IMAGES (state) {
    if (state.editContent) {
      if (state.images) {
        state.images.map(image => {
          setTimeout(() => {
            axios.delete('http://127.0.0.1:3000/delete-image/' + image.id)
          }, 1500)
        })
      }
      state.images = []
    }
  },
  SHOW_MODAL (state) {
    state.showModal = !state.showModal
  },
  SET_DEFAULT (state) {
    state.editContent = {
      coverImage: {
        filename: '',
        id: ''
      },
      title: '',
      content: '',
      tagColors: ['green', 'blue', 'purple', 'pink', 'indigo', 'red'],
      tags: ''
    }
  }
}
