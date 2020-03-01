<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <main-toolbar @toggleleftdrawer="leftDrawerOpen = !leftDrawerOpen"/>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <main-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import MainToolbar from 'src/layouts/MainToolbar.vue'
import MainMenu from 'src/layouts/MainMenu.vue'

export default {
  name: 'Default',
  components: {
    MainToolbar,
    MainMenu
  },
  beforeCreate () {
    this.$store.dispatch('notes/list')
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
