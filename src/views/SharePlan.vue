<template>
  <div class="example ex1">
    <h1>검색할 태그를 선택하세요</h1>
    <label class="radio spring">
      <input type="radio" name="group1" v-model="tour_type" value="0"/>
      <span>혼자서</span>
    </label>
    <label class="radio summer">
      <input type="radio" name="group1" v-model="tour_type" value="1"/>
      <span>친구들</span>
    </label>
    <label class="radio fall">
      <input type="radio" name="group1" v-model="tour_type" value="2"/>
      <span>가족</span>
    </label>
    <label class="radio winter">
      <input type="radio" name="group1" v-model="tour_type" value="3"/>
      <span>연인</span>
    </label>
    <br><br>
    <label class="radio spring">
      <input type="radio" name="group2" v-model="season" value="0"/>
      <span>봄</span>
    </label>
    <label class="radio summer">
      <input type="radio" name="group2" v-model="season" value="1"/>
      <span>여름</span>
    </label>
    <label class="radio fall">
      <input type="radio" name="group2" v-model="season" value="2"/>
      <span>가을</span>
    </label>
    <label class="radio winter">
      <input type="radio" name="group2" v-model="season" value="3"/>
      <span>겨울</span>
    </label>
    <br><br>
    <button class="btn btn-success" v-on:click="search()"> search</button>
    <br>
    {{idPlan}}
    <br><br>
    <router-link to='/'>
      <button class="btn btn-success">홈으로</button>
    </router-link>
    <div id="tour_list" v-if="clickedSearch==true">
      <div class="centered" v-for="tour in tours" :key="tour.idPlan">
        <div style="padding:10px">
          <router-link :to="{ name: 'DetailTour', params: { id: tour.idPlan }}">
            <ul class="list-group">
            <li class="list-group-item list-group-item-success">{{tour.title}}</li>
            <li class="list-group-item list-group-item-light">{{tour.depart_day}} ~ {{tour.arrive_day}}</li>
            <li class="list-group-item list-group-item-light">{{tour.country_name}}</li>
            </ul>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from '../components/API'
export default {
  created: function () {
  },
  data () {
    return {
      tours: [],
      tour_type: '',
      season: '',
      idPlan: '',
      clickedSearch: false
    }
  },
  methods: {
    search: function () {
      const data = {
        tour_type: this.tour_type,
        season: this.season
      }
      API.searchTourAPI(this.$http, this.$env.apiUrl, data).then(res => {
        this.clickedSearch = true
        this.tours = res.data
        if (res.data.success === true) {
          this.$router.push('/')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

  h1 {
    font-family: "DX경필고딕";
    size: 70px;
  }

  #illu {
    width: 80px;
    height: 35px;
  }

  .example {
    margin: 15% auto auto auto
  }

  .example input {
    display: none;
  }

  .example label {
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
  }

  .ex1 span {
    display: block;
    padding: 5px 10px 5px 25px;
    border: 2px solid #ddd;
    border-radius: 5px;
    position: relative;
    transition: all 0.25s linear;
  }

  .ex1 span:before {
    content: '';
    position: absolute;
    left: 5px;
    top: 50%;
    -webkit-transform: translatey(-50%);
    transform: translatey(-50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ddd;
    transition: all 0.25s linear;
  }

  .ex1 input:checked + span {
    background-color: #fff;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  }

  .ex1 .spring input:checked + span {
    color: #35ff59;
    border: 3px solid #35ff59;
  }

  .ex1 .spring input:checked + span:before {
    background-color: #35ff59;
  }

  .ex1 .summer input:checked + span {
    color: #5c72ff;
    border-color: #5c72ff;
  }

  .ex1 .summer input:checked + span:before {
    background-color: #5c72ff;
  }

  .ex1 .fall input:checked + span {
    color: #ff682e;
    border-color: #ff682e;
  }

  .ex1 .fall input:checked + span:before {
    background-color: #ff682e;
  }

  .ex1 .winter input:checked + span {
    color: #6cf0ff;
    border-color: #6cf0ff;
  }

  .ex1 .winter input:checked + span:before {
    background-color: #6cf0ff;
  }
  article{
    margin: 10px;
    border-radius: 5px;
    border-color: #42b983;
  }
  ul{
    width:400px;
    vertical-align: middle;
    margin:auto;
  }
</style>
