<template>
  <div id="LogIn">
    <h2 class="text-info">Sign Up</h2>
    <input type="email" required v-model="user_email" placeholder="EMAIL"><br><br>
    <input required v-model='user_id' placeholder="ID">
    <button v-on:click="overlap()">중복확인</button>
    <br><br>
    <input required v-model='user_name' placeholder="NAME"><br><br>
    <input required type="password" v-model='user_password' placeholder="PASSWORD"><br><br>
    <input required type="password" v-model="user_password_confirm" placeholder="PASSWORD CONFIRM"><br><br>
    <input type="radio" v-model="user_gender" name="user_gender" value="1">Male
    <input type="radio" v-model="user_gender" name="user_gender" value="0">Female<br><br>
    <input required v-model='user_phone' placeholder="PHONE"><br><br>
    <button v-on:click="register()" id="bu1">
    <img class="illu" src="../assets/adding.png">
    </button>
    <br>
    <router-link to='/'>
    <img class="illu" src="../assets/gotoHome.png">
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
      user_phone: '',
      btn: ''
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
      if (!this.empty()) {
        alert('비어있는 값이 있습니다.')
        return
      }
      if (!this.validatePassword()) {
        alert('패스워드가 다릅니다.')
        this.user_password = ''
        this.user_password_confirm = ''
        return
      }
      if (this.btn === '') {
        alert('Id 중복확인을 하지 않으셨습니다\n')
        return
      }
      API.registerAPI(this.$http, this.$env.apiUrl, data).then(res => {
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
    },
    empty () {
      if (this.user_email === '' &&
        this.user_id === '' &&
        this.user_name === '' &&
        this.user_password === '' &&
        this.user_password_confirm === '' &&
        this.user_gender === '' &&
        this.user_phone === '') {
        return false
      } else {
        return true
      }
    },
    overlap () {
      this.btn = '1'
      const data = {
        user_id: this.user_id
      }
      API.checkingOverlap(this.$http, this.$env.apiUrl, data).then(res => {
        if (res.data.is_exist === true) {
          this.user_id = ''
          alert('이미 있는 아이디 입니다.')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
  .illu {
    width: 80px;
    height: 35px;
  }

  #bu1 {
    background-color: #ffffff;
    border : none;
    width: 80px;
    height: 35px;
    margin: 3px 0px;
  }

  #LogIn {
    border: 5px solid #4cbaa8;
    border-radius: 40px;
    width: 500px;
    padding: 20px 20px;
    margin: 13% auto auto auto;
  }
</style>
