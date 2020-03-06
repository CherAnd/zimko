<template>
  <q-list>
    <q-item-label header>Notes</q-item-label>
    <q-item to="/"
      exact
      active-class="text-orange-10">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>home</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-for="note in notes"
      :key="note.id"
      :to="'/note/'+note.id"
      active-class="text-orange-10"
    >
      <q-item-section avatar>
        <q-icon name="note" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ note.title }}</q-item-label>
        <q-item-label caption>{{ note.created_at }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>

export default {
  name: 'MainMenu',
  computed: {
    notes () {
      return Object.values(this.$store.state.notes.all)
    }
  }
}
</script>

<style>
</style>
