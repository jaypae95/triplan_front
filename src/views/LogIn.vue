<template>
  <div id="LogIn">
    <p>LogIn Page</p>
    <input required v-model='user_id' placeholder="ID"><br><br>
    <input required v-model='user_password' placeholder="PASSWORD"><br><br>
    <button v-on:click="login()" id="bu1">
      <img id="illu1" src="../assets/login.png">
    </button>
    <br>
    <router-link to='/'>
      <img id="illu" src="../assets/gotoHome.png">
    </router-link>
  </div>
</template>
<script>
import API from '../components/API'

export default {
  data () {
    return {
      user_id: '',
      user_password: ''
    }
  },
  methods: {
    login: function () {
      const data = {
        user_id: this.user_id,
        user_password: this.user_password
      }
      API.loginAPI(this.$http, this.$env.apiUrl, data)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          this.$http.defaults.headers.common['Authorization'] = token
          this.$store.commit('saveUser', user)
          this.$store.commit('saveToken', token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
  #illu, #illu1, #bu1 {
    width: 80px;
    height: 35px;
  }

  #bu1 {
    background-color: #ffffff
  }

  #LogIn {
    border: 5px solid #4cbaa8;
    border-radius: 40px;
    width: 500px;
    padding: 20px 20px;
    margin: auto;
  }
</style>
