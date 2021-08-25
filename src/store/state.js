const content = localStorage.getItem('editContent')
let editContent
const showModal = false
const save = false
const baseURL = 'https://labangla-api.herokuapp.com'
// https://labangla-api.herokuapp.com

if (content) {
  editContent = JSON.parse(content)
} else {
  editContent = {
    coverImage: {
      filename: '',
      id: ''
    },
    title: '',
    content: '',
    author: '',
    timeRead: 0
  }
}

const load = false
const images = []

export default {
  editContent,
  load,
  images,
  showModal,
  save,
  baseURL
}
