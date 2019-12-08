<template>
  <div>
    <span>Select Continents : </span>
    <select class="sel" @change="selectContinent($event)" name="continent">
      <option></option>
      <option v-for="continent in continents" :key="continent.id">{{continent}}</option>
    </select>
    <br><br>

    <div v-if="checkContinent">
      <span>Select Country : </span>
      <select class="sel" @change="selectCountry($event)" name="country">
        <option></option>
        <option v-for="country in countries" :key="country.id">{{country.country_name}}</option>
      </select>
    </div>
    <br>

    <div v-if="untilCountry === false">
      <div v-if="checkCountry">
        <span>Select City : </span>
        <select class="sel" @change="selectCity($event)" name="city">
          <option></option>
          <option v-for="city in cities" v-bind:key="city.id">{{city.city_name}}</option>
        </select>
      </div>
      <br>
      <button id="btn" v-on:click="reset"><img id="illu" src="../assets/reset.png"> </button>
    </div>
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
      checkPlace: false,
      continents: ['아시아', '유럽', '남태평양', '북아메리카', '남아메리카'],
      countries: [],
      cities: [],
      places: []
    }
  },
  props: {
    untilCountry: Boolean
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
      if (this.untilCountry) {
        this.$emit('select-country', idCountry)
      } else {
        API.getCityAPI(this.$http, this.$env.apiUrl, idCountry).then(res => {
          this.checkCountry = true
          this.checkCity = false
          res.data.forEach(this.pushCities)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    selectCity (event) {
      this.places = []
      const idxCity = this.cities.findIndex(e => e.city_name === event.target.value)
      const idCity = this.cities[idxCity].idCity

      API.getPlaceAPI(this.$http, this.$env.apiUrl, idCity).then(res => {
        this.checkCity = true
        res.data.forEach(this.pushPlaces)
        if (this.places.length === 0) this.noList = true
        this.$emit('select-city', this.places)
        this.$emit('is-no-list', this.noList)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
 #illu{
    width: 80px;
    height: 35px;
  }
  #btn{
    background-color: #ffffff;
    border: none;
  }
</style>