<template>
  <div class="makePlan">
    <h1>Make Plan</h1>
    <div id="div0">
    <div v-for="item in dayplan" v-bind:key='item'>
      <ul id="uli">
      <button id="addDay">
        Day {{item.day}}
      </button>
      <div v-if="item%10==0"><br></div>
      </ul>
    </div>
    <button v-on:click="cl1">고르기</button>
   <div v-if="showM" @close="showM=false">
     <select @change="selectCity($event)" name="city">
<!--      <option disabled value="">Select City</option>-->
      <option></option>
      <option v-for="city in cities" v-bind:key="city.id">{{city.city_name}}</option>
    </select>
    </div>
     <button id="addBtn" v-on:click="newAdd">+</button>
     </div>
     <br>
    <div id="div1">
      <div id="tourList">
        <p id="w1"> 관광지</p>
      </div>
      <br>
      <div v-for ="idx in places" v-bind:key='idx'>
        <button v-on:click="makeTour(idx)">{{idx.place_name}}</button>
        <br>
      </div>
    </div>
    <mapping>
    </mapping>
    <div id="div2">
      <div id="tourList">
        <p id="w1"> 코스</p>
      </div>
      <div id="show" v-for="pl in tours" v-bind:key='pl'>
        <div id="div_tour"> {{pl.place_name}}
        </div>
      </div>
      <button class="btn" v-on:click="storage()" >저장</button>
    </div>
  </div>
</template>

<script>
import mapping from '../components/map'
import API from '../components/API'
var number = 0
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
      checkCity: ''
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
      this.places.push({
        place_name: item.place_name,
        place_id: item.place_id})
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
      const data = {
        tour: this.tours,
        day: number
      }
      if (number !== 0) {
        this.dayplan.push(data)
        const len = this.tours.length
        this.tours.splice(len)
        console.log(this.tours)
      }
      number++
    },
    selectCity (event) {
      this.places = []
      const idxCity = this.cities.findIndex(e => e.city_name === event.target.value)
      const idCity = this.cities[idxCity].idCity

      API.getPlaceAPI(this.$http, this.$env.apiUrl, idCity).then(res => {
        this.checkCity = true
        res.data.forEach(this.pushPlaces)
      }).catch(err => {
        console.log(err)
      })
    },
    makeTour (idx) {
      this.tours.push(idx)
    }
  },
  components: {
    mapping
  }
}
</script>
<style>

#uli{
  white-space: nowrap;
}
#div0{
  text-align: right;
}
#div1, #div2{
  float: left;
  width: 20%;
  height: 99vh;
   border: 4px solid #FF6D6A;
}
h1{
  size:50px;
}
#tourList{
  border: 4px solid #FF6D6A;
  background-color: #FF6D6A;
}
#seeing{
  height: auto;
}
#w1{
  color: #ffffff;
  font-weight: #ffffff;
  font-family: "DX경필고딕"
}
#show{

}
.btn{
  position: relative;
  bottom: 0;
  background-color: #FF6D6A;
}
#addDay{
  display: inline-block;
  float: left;
}
#addBtn{
  background-color: #3d3b3b;
  border: solid 3px #3d3b3b;
  border-radius: 7px;
  color: #ffffff;
}
#div_tour{
  height: auto;
}
</style>
