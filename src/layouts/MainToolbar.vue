<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      @click="toggleMenu()"
      aria-label="Menu"
      id="toggleleftdrawer"
    >
      <q-icon name="menu" />
    </q-btn>

    <q-toolbar-title>
      Zimko
    </q-toolbar-title>

    <div> {{user.name}} </div>
  </q-toolbar>
</template>
<script>
export default {
  name: 'MainToolbar',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    toggleMenu () {
      this.$emit('toggleleftdrawer')
    }
  }
}
</script>
