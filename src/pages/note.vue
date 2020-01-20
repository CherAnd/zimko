/* eslint-disable no-undef */
<template>
  <q-page padding>
      <div class="row justify-between">
        <div>
          <q-btn
        flat
        icon="save"
        @click="save()"
      />
      <q-toggle
        icon="create"
        v-model="isEditable"
      />
        </div>
      <q-btn
        flat
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
import { mapGetters } from 'vuex'

export default {
  name: 'note',
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
        // [
        //   {
        //     label: this.$q.lang.editor.fontSize,
        //     icon: this.$q.iconSet.editor.fontSize,
        //     fixedLabel: true,
        //     fixedIcon: true,
        //     list: 'no-icons',
        //     options: [
        //       'size-1',
        //       'size-2',
        //       'size-3',
        //       'size-4',
        //       'size-5',
        //       'size-6',
        //       'size-7'
        //     ]
        //   },
        //   {
        //     label: this.$q.lang.editor.defaultFont,
        //     icon: this.$q.iconSet.editor.font,
        //     fixedIcon: true,
        //     list: 'no-icons',
        //     options: [
        //       'default_font',
        //       'arial',
        //       'arial_black',
        //       'comic_sans',
        //       'courier_new',
        //       'impact',
        //       'lucida_grande',
        //       'times_new_roman',
        //       'verdana'
        //     ]
        //   },
        //   'removeFormat'
        // ],
        ['insert_img']
      ]
    }
  },
  mounted () {
    if (this.$route.params.id === 'new') this.isEditable = true
  },
  computed: {
    id () {
      if (this.$route.params.id === 'new') return 0
      else return parseInt(this.$route.params.id)
    },
    note () {
      let n = this.getNoteById(this.id)
      if (n) return n
      else return { title: '', body: '' }
    },
    ...mapGetters([
      'getNoteById'
    ])
  },
  watch: {
    note: {
      handler: function (val) {
        this.title = val.title
        this.body = val.body
      },
      immediate: true
    }
  },
  methods: {
    insertImg () { // insertImg method
      // let post = this.body
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
          // document.execCommand('insertHTML', true, `<div><img src="${dataUrl}" /></div>`)
        }
        reader.readAsDataURL(file)
      }
      input.click()
    },
    save () {
      if (this.id === 0) {
        this.$store.dispatch('addNote', { title: this.title, body: this.body })
          .then((id) => {
            this.$router.push('/note/' + id)
          })
      } else this.$store.dispatch('updateNote', { id: parseInt(this.id), value: { title: this.title, body: this.body } })
    },
    deleteNote () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Realy delete?',
        cancel: true,
        persistent: false
      }).onOk(() => {
        this.$store.dispatch('deleteNote', this.id)
          .then(this.$router.push('/'))
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
