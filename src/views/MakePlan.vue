<template>
  <div class="makePlan">
    <h1>Make Plan</h1>
    <div id="div0">
      <div v-for="item in Days" v-bind:key='item.idx'>
          <button id="btnDay" v-on:click="showTour(item.idx)">
            Day {{item.idx}}
            <br>
            {{item.st}}
          </button>
      </div>
      <button id="addBtn" v-on:click="newAdd">+</button>
      <br>
      <button v-on:click="cl1">고르기</button>
      <div v-if="showM" @close="showM=false">
        <select @change="selectCity($event)" name="city">
          <!--      <option disabled value="">Select City</option>-->
          <option></option>
          <option v-for="city in cities" v-bind:key="city.id">{{city.city_name}}</option>
        </select>
      </div>
    </div>
    <br>
    <div id="div1">
      <div class="tourList">
        <p class="w1">관광지</p>
      </div>
      <br>
      <div v-for="idx in places" v-bind:key='idx.place_id'>
        <button v-on:click="makeTour(idx.place_id, idx.place_name)">{{idx.place_name}}</button>
        <br>
      </div>
    </div>
    <mapping>
    </mapping>
    <div id="div2">
      <div class="tourList">
        <p class="w1"> 코스</p>
      </div>
      <div id="show" v-for="pl in tours" v-bind:key='pl.place_id'>
        <div id="div_tour"> {{pl.name}}
        </div>
      </div>
      <button class="btn" v-on:click="addTour">저장</button>
      <button class="btn" v-on:click="sendResult">최종 저장</button>
    </div>
  </div>
</template>

<script>
import mapping from '../components/map'
import API from '../components/API'

var number = 1
var dayNum = 0
var cc = ''
export default {
  name: 'makePlan',
  data () {
    return {
      showM: false,
      tours: [],
      dayplan: [],
      country_id: '',
      cities: [],
      places: [],
      Days: [],
      checking: []
    }
  },
  methods: {
    pushCities (item) {
      this.cities.push({
        idCity: item.idCity,
        city_name: item.city_name
      })
    },
    pushPlaces (item) {
      const data = {
        place_name: item.place_name,
        place_id: item.place_id
      }
      this.places.push({
        ...data
      })
    },
    cl1 () {
      this.showM = true
      this.country_id = this.$store.state.country.country_id
      API.getCityAPI(this.$http, this.$env.apiUrl, this.country_id).then(res => {
        res.data.forEach(this.pushCities)
      }).catch(err => {
        console.log(err)
      })
    },
    newAdd () {
      const start = this.$store.state.date.start.split('-')
      const end = this.$store.state.date.end.split('-')
      for (var i = 0; i < 3; i++) {
        start[i] *= 1
        end[i] *= 1
      }
      while (1) {
        const data = {
          st: start.toString(),
          idx: number
        }
        this.Days.push(data)
        if (start[0] === end[0] && start[1] === end[1] && start[2] === end[2]) break
        var check = 0
        start[2] += 1
        if ((start[1] < 8 && start[1] % 2 === 1) || (start[1] >= 8 && start[1] % 2 === 0)) {
          if (start[2] > 31) {
            start[2] = 1
            check = 1
          }
        } else {
          if (start[2] > 30) {
            start[2] = 1
            check = 1
          }
        }
        if (check === 1) {
          start[1] += 1
          if (start[1] > 12) {
            start[1] = 1
            start[0] += 1
          }
        }
        number++
      }
    },
    selectCity (event) {
      this.places = []
      const idxCity = this.cities.findIndex(e => e.city_name === event.target.value)
      const idCity = this.cities[idxCity].idCity
      cc = idCity
      API.getPlaceAPI(this.$http, this.$env.apiUrl, idCity).then(res => {
        res.data.forEach(this.pushPlaces)
      }).catch(err => {
        console.log(err)
      })
    },
    makeTour (id, name) {
      this.tours.push({
        place_id: id,
        name: name
      })
    },
    addTour (d) {
      const data = {
        place_id: this.tours,
        day: dayNum,
        city_id: cc
      }
      this.dayplan[data.day - 1] = data
      console.log(this.dayplan)
      this.checking[dayNum] = 1
      this.tours = []
    },
    showTour (idx) {
      this.tours = []
      dayNum = idx
      console.log(dayNum)
      if (this.checking[dayNum] === 1) {
        const result = this.dayplan[idx - 1].tour
        this.tours = result
      }
    },
    sendResult () {
      const idPlan = this.$store.state.idPlan
      const data = {
        idPlan: idPlan,
        dayplan: this.dayplan
      }
      console.log('id: ' + idPlan)
      API.getCompletePlan(this.$http, this.$env.apiUrl, data).then(res => {
        if (res.success === true) { console.log('hello') }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    mapping
  }
}
</script>
<style>

#btnDay{
  float:left;
  margin: 2px 5px;
  background-color: #ffffff;
  border: 2px dashed  #FF6D6A;

}

  #div0 {
    text-align: right;
  }

  #div1, #div2 {
    float: left;
    width: 20%;
    height: 70vh;
    border: 4px solid #FF6D6A;
  }
  #div1{
    margin: 0px 0px 0px 10px
  }
  h1 {
    size: 100px;
  }

  .tourList {
    border: 4px solid #FF6D6A;
    background-color: #FF6D6A;
  }

  .w1 {
    color: #ffffff;
    font-family: "DX경필고딕"
  }

  .btn {
    position: relative;
    bottom: 0;
    background-color: #FF6D6A;
  }

  #addDay {
    display: inline-block;
    float: left;
  }

  #addBtn {
    background-color: #3d3b3b;
    border: solid 3px #3d3b3b;
    border-radius: 7px;
    color: #ffffff;
  }

  #div_tour {
    height: auto;
  }
</style>
