<template>
  <div>
    <p>Attraction List Page</p>
    <router-link to="/">Go To Main</router-link><br><br>

    <button v-on:click="selectContinent">Continent</button>
    <button v-on:click="selectCountry">Country</button><br><br>

<!--    <select>-->
<!--      <option name="continent" value="asia">Asia</option>-->
<!--      <option name="continent" value="Europe">Europe</option>-->
<!--    </select>-->
<!--    <br>-->

    <select @change="selectContinent($event)">
      <option disabled value="">Select Continent</option>
      <option v-for="conti in continents" v-bind:key="conti.id">{{conti}}</option>
    </select>
    <br>

  <a v-if="checkContinent">
    <select @change="selectCountry($event)">
      <option disabled value="">Select Country</option>
      <option v-for="coun in countries" v-bind:key="coun.id">{{coun}}</option>
    </select>
  </a>

    <p>continents : {{continents}}</p>
  </div>
</template>

<script>
import API from '../components/API'

export default {
  data () {
    return {
      checkContinent: false,
      checkCountry: false,
      continents: ['a', 'b', 'c'],
      countries: [],
      cities: []
    }
  },

  methods: {
    selectContinent () {
      API.getContinent(this.$http, this.$env.apiUrl, 'asia').then(res => {
        console.log(res)
        this.checkContinent = true
        this.continents.push(res.data.country_name)
      }).catch(err => {
        console.log(err)
      })
    },

    selectCountry () {
      API.getCountry(this.$http, this.$env.apiUrl, '13').then(res => {
        console.log(res)
        this.checkCountry = true
        this.countries.push(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>
