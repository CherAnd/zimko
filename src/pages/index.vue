<template>
  <q-page class="flex flex-center">
    <q-virtual-scroll
      :items="notes"
      separator
    >
      <template v-slot="{ item, index }">
        <q-item
          :key="index"
          clickable v-ripple
          :to="'/note/' + item.id"
        >
          <q-item-section>
            <q-item-label overline> {{ item.updated_at }} </q-item-label>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-virtual-scroll>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]">
      <q-btn
        id="new_note"
        round
        color="orange-10"
        @click="newNote()"
        icon="add"
      />
    </q-page-sticky>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Index',
  computed: {
    notes () {
      return Object.values(this.$store.state.notes.all)
    }
  },
  methods: {
    newNote () {
      this.$router.push('/note/new')
    }
  }
}
</script>
