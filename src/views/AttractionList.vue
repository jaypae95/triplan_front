<template>
  <div>
    <p>Attraction List Page</p>
    <router-link to="/">Go To Main</router-link><br><br>

    <button v-on:click="selectContinent">Continent</button>
    <button v-on:click="selectCountry">Country</button>

    <!--  <select class="form-control" @change="selectContinent()">-->
    <!--    <option value="" disabled>Select a continent</option>-->
    <!--    <option v-for="conti in continents" v-bind:key="conti.id">{{conti}}</option>-->
    <!--  </select>-->

    <p>continents : {{continents[0]}}</p>
    <p>countries : {{countries[0]}}</p>

  </div>
</template>

<script>
import API from '../components/API'

export default {
  data () {
    return {
      continents: [],
      countries: [],
      cities: []
    }
  },

  methods: {
    selectContinent () {
      API.getContinent(this.$http, this.$env.apiUrl, 'asia').then(res => {
        console.log(res)
        this.continents.push(res.data)
      }).catch(err => {
        console.log(err)
      })
    },

    selectCountry () {
      API.getCountry(this.$http, this.$env.apiUrl, '13').then(res => {
        console.log(res)
        this.countries.push(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>
