/* eslint-disable no-undef */
<template>
  <q-page padding>
      <div class="row justify-between">
        <div>
          <q-btn
            color="primary"
            icon="save"
            @click="save()"
          />
        <q-toggle
          icon="create"
          v-model="isEditable"
          color="primary"
        />
        </div>
      <q-btn
        color="primary"
        icon="delete"
        @click="deleteNote()"
      />
      </div>

      <q-input
        borderless
        v-model.lazy="title"
        class="note_title"
        :readonly="!isEditable"
        autofocus
        placeholder="Title"
      />
      <q-editor
        v-model.lazy="body"
        :definitions="definitions"
        :toolbar="toolbar"
        height="75vh"
        class="q-mt-md"
        flat
        :readonly="!isEditable"
      />
  </q-page>
</template>

<script>
import { Note } from 'src/models/classes'

export default {
  name: 'note',
  props: {
    id: {
      type: String,
      default: 'new'
    }
  },
  data () {
    return {
      title: 'Loading...',
      body: '',
      isEditable: false,
      definitions: {
        insert_img: {
          tip: 'Вставить картинку',
          icon: 'photo',
          label: '',
          handler: this.insertImg // handler will call insertImg() method
        }
      },
      toolbar: [
        ['undo', 'redo'],
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'underline', 'strike'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['insert_img']
      ]
    }
  },
  mounted () {
    if (this.id === 'new') this.isEditable = true
  },
  computed: {
    note () {
      let n = this.$store.state.notes.all[this.id]
      if (typeof n !== 'undefined') return n
      else return new Note()
    }
  },
  watch: {
    note: {
      handler: function (val) {
        this.title = val.title
        this.body = val.body || ''
      },
      immediate: true
    }
  },
  methods: {
    insertImg () { // insertImg method
      // create an input file element to open file dialog
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.png, .jpg' // file extensions allowed
      let file
      input.onchange = _ => {
        const files = Array.from(input.files)
        file = files[0]

        // lets load the file as dataUrl
        const reader = new FileReader()
        let dataUrl = ''
        reader.onloadend = () => {
          dataUrl = reader.result
          // append result to the body of your post
          this.body += `<div><img src='${dataUrl}' /></div>`
        }
        reader.readAsDataURL(file)
      }
      input.click()
    },
    save () {
      if (this.id === 'new') {
        this.$store.dispatch('notes/insert', new Note(this.title, this.body))
          .then((id) => {
            this.$router.push('/note/' + id)
          })
      } else this.$store.dispatch('notes/update', { id: this.id, value: new Note(this.title, this.body) })
    },
    deleteNote () {
      this.$q.dialog({
        title: 'Удалить',
        message: 'Точно удалить?',
        cancel: true,
        persistent: false
      }).onOk(() => {
        this.$router.push('/')
        this.$store.dispatch('notes/remove', this.id)
      })
    }
  }
}
</script>
<style>
.note_title input {
  font-size: x-large;
  font-weight: bolder;
}
</style>
