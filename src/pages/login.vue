<template>
  <q-page padding>
    <q-card >
      <q-card-section>
        <h4>Login</h4>
      </q-card-section>
    <q-card-section>
      <q-input square outlined v-model="email" label="username" />
      <q-input square outlined v-model="password" label="password" type="password" />
    </q-card-section>
    <q-card-section>
      <a href="/register">Register</a>
    </q-card-section>
    <q-card-actions>
      <q-btn color="white" text-color="black" label="Submit login" @click="loginSubmit" />
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
</style>
