<template>
  <q-page padding class="full-width row no-wrap justify-center items-center content-center">
    <q-card class="card-style">
      <q-card-section>
        <div class="text-h6">Вход</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-gutter-md">
        <q-input square outlined v-model="email" label="email пользователя" @keyup.enter="loginSubmit()"/>
        <q-input square outlined v-model="password" label="пароль" type="password" @keyup.enter="loginSubmit()"/>
      </q-card-section>
      <q-card-section>
        <a href="/register">Регистрация</a>
      </q-card-section>
      <q-separator inset />
      <q-card-actions vertical>
        <q-btn color="primary" label="Войти" @click="loginSubmit()" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginSubmit () {
      this.$store.dispatch('doLogin', {
        email: this.email,
        password: this.password
      })
        .then(() => this.$router.push('/'))
        // .catch(err => console.log(err))
    }
  }
}
</script>

<style>
.card-style {
  width: 100%;
  max-width: 50vw;
}
</style>
