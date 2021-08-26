<template>
  <section class="relative">
    <div v-if="editor" class="activeBtnWrapper fixed left-1">
      <div
        class="activeBtn activeBtnDiv"
        @click="setNew"
      >
        <font-awesome-icon :icon="['fas', 'plus']" class="awesomeIcon lightBulb"/>
      </div>
    </div>
    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <div class="rounded-full" @click="showMenu">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </div>
      <div v-if="menu" class="menu rounded-full fixed left-2 top-2 flex">
        <div class="menuBtn mr-1">
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :class="{'is-active': editor.isActive('bold')}"
          >
            <font-awesome-icon :icon="['fas', 'bold']" class="iconBtn"/>
          </button>
        </div>
        <div class="menuBtn mr-1">
          <button
            data-text="italic"
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{'is-active': editor.isActive('italic')}"
          >
            <font-awesome-icon :icon="['fas', 'italic']" class="iconBtn"/>
          </button>
        </div>
        <div class="menuBtn mr-2">
          <button
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{'is-active': editor.isActive('codeBlock')}"
          >
            <font-awesome-icon :icon="['fas', 'code']" class="iconBtn"/>
          </button>
        </div>
        <div class="menuBtn mr-1">
          <form class="border-transparent">
            <label for="imgEditor" class="border-transparent">
              <font-awesome-icon :icon="['fas', 'image']" class="iconBtn"/>
            </label>
            <input type="file" hidden id="imgEditor" ref="file" @change="fileChange"/>
          </form>
        </div>
        <div class="menuBtn mr-2">
          <button
            @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{'is-active': editor.isActive({ textAlign: 'left' })}"
          >
            <font-awesome-icon :icon="['fas', 'align-left']" class="iconBtn"/>
          </button>
        </div>
        <div class="menuBtn mr-2">
          <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{'is-active': editor.isActive({ textAlign: 'center' })}"
          >
            <font-awesome-icon :icon="['fas', 'align-center']" class="iconBtn"/>
          </button>
        </div>
        <div class="menuBtn mr-2">
          <button
            @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{'is-active': editor.isActive({ textAlign: 'right' })}"
          >
            <font-awesome-icon :icon="['fas', 'align-right']" class="iconBtn"/>
          </button>
        </div>
      </div>
    </floating-menu>
    <editor-content :editor="editor" placeholder="write"/>
  </section>
</template>

<script>
import axios from 'axios'
import { Editor, EditorContent, FloatingMenu } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TipTap',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    EditorContent,
    FloatingMenu
  },
  data () {
    return {
      editor: null,
      menu: false,
      fontIcon: ['fas', 'paragraph'],
      info: 'This icons indicates that a command has been activated.',
      uploadedImages: []
    }
  },
  watch: {
    value (value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(this.value, false)
    }
  },
  computed: {
    ...mapState([
      'baseURL'
    ])
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Placeholder,
        Highlight,
        Typography,
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
        Heading,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        })
      ],
      content: this.value,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    ...mapMutations([
      'SET_CONTENT',
      'SET_IMAGES'
    ]),
    showMenu () {
      this.menu = !this.menu
    },
    setNew () {
      this.editor.chain().focus().setHardBreak().run()
      this.editor.chain().focus().clearNodes().run()
    },
    fileChange () {
      const file = this.$refs.file.files[0]
      this.uploadImage(file)
    },
    async uploadImage (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const responseData = await axios.post(this.baseURL + '/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (responseData.data.file) {
          this.uploadedImages.push({
            filename: responseData.data.file.filename,
            id: responseData.data.file.id
          })
          this.SET_IMAGES(this.uploadedImages)
          this.editor.chain().focus().setImage({
            src: this.baseURL + '/image/' + responseData.data.file.filename
          }).run()
        }
      } catch (err) {
        alert(err.message)
      }
    }
  }
}
</script>

<style lang="scss">
.lightBulb {
  animation: spin 10s infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.activeBtnWrapper {
  top: 320px;
}
.activeBtn {
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 50%;
  background: #212f67;
  color: white;
  cursor: pointer;
  margin-bottom: 5px;

  .awesomeIcon {
    margin-top: 15px;
  }
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}
/* Placeholder (on every new line) */
.ProseMirror p.is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}
/* Basic editor styles */
.ProseMirror:focus {
  outline: none;
}
.ProseMirror {
  // height: 12rem;
  overflow-y: auto;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    padding: 3px;
    border-radius: 10px;
    background: grey;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid #9f9f9f;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
.floating-menu {
  display: flex;
  position: absolute;
  left: -37px;
  top: -15px;
  background-color: #0D0D0D10;
  padding: 0.2rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  .menuBtn {
    width: 25px;
    height: 25px;
    background: #e3e3e3;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;

    .iconBtn {
      color: #212f67;
    }
  }

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
