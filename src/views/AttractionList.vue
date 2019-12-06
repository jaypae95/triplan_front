<template>
  <div id="app">
    <p>Attraction List Page</p>
    <router-link to="/">Go To Main</router-link><br><br>

    <span>Select Continents : </span>
    <select class="sel" @change="selectContinent($event)" name="continent">
<!--      <option disabled value="">Select Continent</option>-->
      <option></option>
      <option v-for="continent in continents" :key="continent.id">{{continent}}</option>
    </select>
    <br><br>

    <div v-if="checkContinent">
      <span>Select Country : </span>
      <select class="sel" @change="selectCountry($event)" name="country">
<!--      <option disabled value="">Select Country</option>-->
      <option></option>
      <option v-for="country in countries" :key="country.id">{{country.country_name}}</option>
    </select>
  </div>
    <br>

    <div  v-if="checkCountry">
      <span>Select City : </span>
    <select class="sel" @change="selectCity($event)" name="city">
<!--      <option disabled value="">Select City</option>-->
      <option></option>
      <option v-for="city in cities" v-bind:key="city.id">{{city.city_name}}</option>
    </select>
  </div>
    <br>

    <button id="btn" v-on:click="reset">초기화</button>

    <div v-if="checkCity">
      <div v-if="noList">
        <p id="noAttr">No Attraction!</p>
      </div>
        <ul v-for="place in places" v-bind:key="place.id"><b>{{place}}</b><br>
<!--          Image url here, NEED TO BE UPDATED-->
        <img id="ii" src="https://img-wishbeen.akamaized.net/plan/1453194127890_%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KQ7A1270.jpg"><br><hr>
        </ul>
    </div>
    <br>

  </div>
</template>

<script>
import API from '../components/API'

export default {
  data () {
    return {
      noList: false,
      checkContinent: false,
      checkCountry: false,
      checkCity: false,
      continents: ['아시아', '유럽', '남태평양', '북아메리카', '남아메리'],
      countries: [],
      cities: [],
      places: []
    }
  },
  methods: {
    reset () {
      // eslint-disable-next-line
      this.checkContinent = false,
      this.checkCountry = false,
      this.checkCity = false
    },
    pushCountries (item) {
      this.countries.push({
        idCountry: item.idCountry,
        country_name: item.country_name
      })
    },
    pushCities (item) {
      this.cities.push({
        idCity: item.idCity,
        city_name: item.city_name
      })
    },
    pushPlaces (item) {
      this.places.push(item.place_name)
    },

    selectContinent (event) {
      this.countries = []
      const idContinent = this.continents.findIndex(e => e === event.target.value) + 1

      API.getCountryAPI(this.$http, this.$env.apiUrl, idContinent).then(res => {
        this.checkContinent = true
        this.checkCountry = false
        this.checkCity = false
        res.data.forEach(this.pushCountries)
      }).catch(err => {
        console.log(err)
      })
    },
    selectCountry (event) {
      this.cities = []
      const idxCountry = this.countries.findIndex(e => e.country_name === event.target.value)
      const idCountry = this.countries[idxCountry].idCountry

      API.getCityAPI(this.$http, this.$env.apiUrl, idCountry).then(res => {
        this.checkCountry = true
        this.checkCity = false

        res.data.forEach(this.pushCities)
      }).catch(err => {
        console.log(err)
      })
    },
    selectCity (event) {
      this.places = []
      const idxCity = this.cities.findIndex(e => e.city_name === event.target.value)
      const idCity = this.cities[idxCity].idCity

      API.getPlaceAPI(this.$http, this.$env.apiUrl, idCity).then(res => {
        this.checkCity = true
        res.data.forEach(this.pushPlaces)
        if (this.places.length === 0) this.noList = true
      }).catch(err => {
        console.log(err)
      })
    }

  }

}
</script>

<style>
  #ii{
    width:400px;
    height:200px;
  }
  #btn{
  color: #fff;
    background-color: #64b99f;
    font-size: 26px;
    font-family: monospace;
    border-radius: 8px;
  }
  .sel{
    padding: 3px;
    font-size: 20px;
    border-radius: 6px;
    box-sizing: content-box;
  }
  #noAttr{
    font-size: 26px;
  }
</style>
