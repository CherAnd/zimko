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
        v-model.lazy="note.title"
        class="note_title"
        :readonly="!isEditable"
        autofocus
        placeholder="Title"
      />
      <q-editor
        v-model.lazy="note.body"
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
// import { Note } from 'src/models/classes'

export default {
  name: 'note',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // note: new Note(),
      isEditable: true,
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
  computed: {
    note () {
      return this.$store.state.notes.all[this.$store.state.notes.active]
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
        this.$store.dispatch('notes/insert', this.note)
          .then((id) => {
            this.$router.push('/note/' + id)
          })
      } else this.$store.dispatch('notes/update', { id: this.id, value: this.note })
    },
    deleteNote () {
      this.$q.dialog({
        title: 'Точно удалить?',
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
