<template>
  <div id="mypage">
    <h1>마이 페이지</h1>
    <table>
      <tr>
        <td>이름</td>
        <td>{{user.user_name}}</td>
      </tr>
      <tr>
        <td>아이디</td>
        <td>{{user.user_id}}</td>
      </tr>
      <tr>
        <td>이메일</td>
        <td>{{user.user_email}}</td>
      </tr>
      <tr>
        <td>성별</td>
        <td v-if="user.user_gender">남</td>
        <td v-else>여</td>
      </tr>
      <tr>
        <td>연락처</td>
        <td>{{user.user_phone}}</td>
      </tr>
    </table>
    <button v-on:click="haha"></button>
    <router-link to='/'>Go To Main</router-link>
  </div>

</template>

<script>
import API from '../components/API'
export default {
  data () {
    return {
      user: this.$store.state.user,
      plan: ''
    }
  },
  methods: {
    haha () {
      console.log(this.$store.state.user)
    }
  },
  created () {
    API.getMyPlanAPI(this.$http, this.$env.apiUrl).then(res => {
      this.plan = res
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style>
  table {
    margin: auto;
    text-align: center;
  }

  td {
    padding: 10px;
  }
</style>
