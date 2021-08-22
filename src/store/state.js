const content = localStorage.getItem('editContent')
let editContent
const showModal = false
const save = false
const baseURL = 'http://localhost:3000'
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
    tagColors: ['green', 'blue', 'purple', 'pink', 'indigo', 'red'],
    tags: ''
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
