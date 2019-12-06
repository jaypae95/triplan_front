<template>
  <div>
    <p>Attraction List Page</p>
    <router-link to="/">Go To Main</router-link><br><br>

    <select @change="selectContinent($event)" name="continent">
<!--      <option disabled value="">Select Continent</option>-->
      <option></option>
      <option v-for="continent in continents" :key="continent.id">{{continent}}</option>
    </select>
    <br><br>

  <div v-if="checkContinent">
    <select @change="selectCountry($event)" name="country">
<!--      <option disabled value="">Select Country</option>-->
      <option></option>
      <option v-for="country in countries" :key="country.id">{{country.country_name}}</option>
    </select>
  </div>
    <br>

    <div  v-if="checkCountry">
    <select @change="selectCity($event)" name="city">
<!--      <option disabled value="">Select City</option>-->
      <option></option>
      <option v-for="city in cities" v-bind:key="city.id">{{city.city_name}}</option>
    </select>
  </div>
    <br>

    <div v-if="checkCity">
      <ul>
        <li v-for="place in places" v-bind:key="place.id">{{place}}</li>
      </ul>
    </div>
    <br>

<!--    <div v-if="checkPlace">-->
<!--      <p>Your Selection : </p>-->
<!--    </div>-->
<!--    <br>-->

    <button v-on:click="reset">초기화</button>

  </div>
</template>

<script>
import API from '../components/API'

export default {
  data () {
    return {
      checkContinent: false,
      checkCountry: false,
      checkCity: false,
      continents: ['아시아', '유럽', '북아메리카'],
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
      this.checkCity = false,
      this.checkPlace = false
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
        console.log(this.countries)
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
      console.log(idxCity)

      API.getPlaceAPI(this.$http, this.$env.apiUrl, idCity).then(res => {
        this.checkCity = true
        res.data.forEach(this.pushPlaces)
      }).catch(err => {
        console.log(err)
      })
    },
    selectPlace () {
      this.checkPlace = true
    }
  }

}
</script>
