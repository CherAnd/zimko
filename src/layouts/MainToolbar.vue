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

    <div>  </div>
     <q-btn unelevated no-caps icon="account_circle" color="secondary" :label="user.name">
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Настройки</div>
            <q-toggle v-model="removeLocalStorage" label="Удалить локальные данные при выходе" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
            <q-avatar size="72px">
              <q-icon name="account_circle" />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">{{user.name}}</div>

            <q-btn
              color="primary"
              label="Выйти"
              push
              size="md"
              v-close-popup
              @click="logout()"
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>
<script>
export default {
  name: 'MainToolbar',
  data () {
    return {
      removeLocalStorage: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    toggleMenu () {
      this.$emit('toggleleftdrawer')
    },
    logout () {
      this.$router.push('/login')
      if (this.removeLocalStorage) localStorage.removeItem('vuex')
      this.$store.dispatch('doLogout')
    }
  }
}
</script>
