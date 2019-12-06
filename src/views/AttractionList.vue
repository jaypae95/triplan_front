<template>
  <div>
    <p>Attraction List Page</p>
    <router-link to="/">Go To Main</router-link><br><br>

    <select @change="selectContinent($event)" name="conti">
      <option disabled value="">Select Continent</option>
      <option v-for="conti in continents" v-bind:key="conti.id">{{conti}}</option>
    </select>
    <br>

  <conti v-if="checkContinent">
    <select @change="selectCountry($event)" name="coun">
      <option disabled value="">Select Country</option>
      <option v-for="coun in countries" v-bind:id="coun.idCountry" v-bind:key="coun.idCountry">{{coun.country_name}}</option>
    </select>
  </conti>
    <br>

    <coun v-if="checkCountry">
    <select @change="selectCity($event)">
      <option disabled value="">Select City</option>
      <option v-for="city in cities" v-bind:key="city.index">{{city}}</option>
    </select>
  </coun>
    <br>

    <city v-if="checkCity">
      <select>
<!--        <option disabled value="">Select Place</option>-->
        <option v-for="place in places" v-bind:key="place.id">{{place}}</option>
      </select>
    </city>
    <br>

    <place v-if="checkPlace">
      <p>Your Selection : </p>
    </place>

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
      checkPlace: false,
      continents: ['아시아', '유럽', '북아메리카'],
      countries: [],
      cities: [],
      places: []
    }
  },

  methods: {
    pushCountries (item) {
      this.countries.push({
        idCountry: item.idCountry,
        country_name: item.country_name
      })
    },
    pushCities (item) {
      this.cities.push(item.city_name)
    },
    pushPlaces (item) {
      this.places.push(item.place_name)
    },

    selectContinent () {
      API.getCountryAPI(this.$http, this.$env.apiUrl, '1').then(res => {
        console.log(res)
        this.checkContinent = true
        res.data.forEach(this.pushCountries)
        console.log(this.countries)
      }).catch(err => {
        console.log(err)
      })
    },
    selectCountry (event) {
      console.log(event.target.value)
      API.getCityAPI(this.$http, this.$env.apiUrl, '1').then(res => {
        console.log(res)
        this.checkCountry = true
        res.data.forEach(this.pushCities)
      }).catch(err => {
        console.log(err)
      })
    },
    selectCity () {
      API.getPlaceAPI(this.$http, this.$env.apiUrl, '1').then(res => {
        console.log(res)
        this.checkCity = true
        res.data.forEach(this.pushPlaces)
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>
