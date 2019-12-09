<template>
  <div id="mypage">
    <h1>마이 페이지</h1>
    <table class="table table-striped table-responsive-sm" style="width:400px">
      <tr>
        <td>이름</td>
        <td>{{user.user_name}}</td>
      </tr>
      <tr class="table-success">
        <td>아이디</td>
        <td>{{user.user_id}}</td>
      </tr>
      <tr>
        <td>이메일</td>
        <td>{{user.user_email}}</td>
      </tr>
      <tr class="table-success">
        <td>성별</td>
        <td v-if="user.user_gender">남</td>
        <td v-else>여</td>
      </tr>
      <tr>
        <td>연락처</td>
        <td>{{user.user_phone}}</td>
      </tr>
    </table>
    <h1>내가 만든 일정 목록</h1>
    <table class="table table-striped table-responsive-sm" style="width:400px">
      <div v-if="tours.length===0">내가 만든 일정이 없습니다.</div>
      <tr v-else>
        <td colspan="2">
          <div class="centered" v-for="tour in tours" :key="tour.idPlan">
            <div class="card mt-3">
              <router-link :to="{ name: 'DetailTour', params: { id: tour.idPlan }}">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" style="font-size:27px">{{tour.title}}</li>
                  <li class="list-group-item">{{tour.depart_day}} ~ {{tour.arrive_day}}</li>
                  <li class="list-group-item">{{tour.country_name}}</li>
                </ul>
              </router-link>
              <div class="card-body">
                <button class="btn btn-outline-success" @click="clickToggleShare($event, tour.idPlan)">{{shareButtonText(tour)}}</button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <router-link to='/'>Go To Main</router-link>
  </div>
</template>
<script>
import API from '../components/API'
export default {
  data () {
    return {
      user: this.$store.state.user,
      tours: ''
    }
  },
  methods: {
    clickToggleShare (event, id) {
      if (event.target.innerText === '공유하기') {
        event.target.innerHTML = '공유 취소하기'
      } else {
        event.target.innerText = '공유하기'
      }
      const data = {
        idPlan: id
      }
      API.toggleSharePlanAPI(this.$http, this.$env.apiUrl, data).catch(() => {})
    },
    shareButtonText (tour) {
      if (tour.is_shared === 0) {
        return '공유하기'
      } else {
        return '공유 취소하기'
      }
    }
  },
  created () {
    API.getMyPlanAPI(this.$http, this.$env.apiUrl).then(res => {
      this.tours = res.data
      console.log(this.tours)
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
  }
}
</script>
<style>
  *{
    color:#000000;
  }
  .btn{
    padding: 1px 1px;
  }
  #mypage {
    margin: 15% auto auto auto
  }
  table {
    margin: auto;
    padding:30px;
    text-align: center;
    font-family: 'Nanum Pen Script', cursive !important;
    width: 40px;
  }
  td {
    padding: 10px;
  }
  h1{
      font-family: 'Nanum Pen Script', cursive !important;
  }
</style>
