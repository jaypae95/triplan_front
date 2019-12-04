<template>
  <div id="LogIn">
    <p>Sign Up</p>
    <input type="email" required v-model="user_email" placeholder="EMAIL"><br><br>
    <input required v-model='user_id' placeholder="ID"><br><br>
    <input required v-model='user_name' placeholder="NAME"><br><br>
    <input required v-model='user_password' placeholder="PASSWORD"><br><br>
    <input required v-model="user_password_confirm" placeholder="PASSWORD CONFIRM"><br><br>
    <input type="radio" v-model="user_gender" name="user_gender" value="1">Male
    <input type="radio" v-model="user_gender" name="user_gender" value="0">Female<br><br>
    <input required v-model='user_phone' placeholder="PHONE"><br><br>
    <button v-on:click="register()" id="bu1">
      가입
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
      user_email: '',
      user_id: '',
      user_name: '',
      user_password: '',
      user_password_confirm: '',
      user_gender: '',
      user_phone: ''
    }
  },
  methods: {
    register () {
      const data = {
        user_email: this.user_email,
        user_id: this.user_id,
        user_name: this.user_name,
        user_password: this.user_password,
        user_gender: this.user_gender,
        user_phone: this.user_phone
      }
      if (!this.validatePassword()) {
        alert('패스워드가 다릅니다.')
        this.user_password = ''
        this.user_password_confirm = ''
        return
      }
      API.registerAPI(this.$http, this.$env.apiUrl, data).then(res => {
        console.log(res)
        if (res.data.success === true) {
          this.$router.push('/')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    validatePassword () {
      if (this.user_password !== this.user_password_confirm) {
        return false
      } else {
        return true
      }
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
