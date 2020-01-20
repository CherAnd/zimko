<template>
  <q-page padding>
    <q-card >
      <q-card-section>
        <h4>Register</h4>
      </q-card-section>
    <q-card-section>
      <q-input square outlined v-model="name" label="username" />
      <q-input square outlined v-model="email" label="email as login" />
      <q-input square outlined v-model="password" label="password" type="password" />
      <q-input square outlined v-model="passwordConfirm" label="password confirm" type="password" />
      <q-btn color="white" text-color="black" label="Submit register" @click="registerSubmit" />
    </q-card-section>
    <q-card-actions>
    </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    registerSubmit () {
      this.$store.dispatch('doRegister', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm
      })
        .then(() => this.$router.push('/'))
        // .catch(err => console.log(err))
    }
  }
}
</script>

<style>
</style>
