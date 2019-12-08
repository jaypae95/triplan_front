<template>
  <div id="app">
    <h1>Attraction List Page</h1>
    <select-option
      :until-country=false
      @select-city="getPlaceInfo"
      @is-no-list="isNoList"/>
      <router-link to='/'>
      <img class="illu" src="../assets/gotoHome.png">
    </router-link><br>
    <div v-if="checkCity">
      <div v-if="noList">
        <p id="noAttr">No Attraction!</p>
      </div>
      <ul v-for="place in places" v-bind:key="place.id"><b>{{place}}</b><br>
        <!--          Image url here, NEED TO BE UPDATED-->
        <img class="illu" src="https://img-wishbeen.akamaized.net/plan/1453194127890_%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KQ7A1270.jpg"><br><hr>
      </ul>

    </div>
    <br>
  </div>
</template>

<script>
import SelectOption from '../components/SelectOption'

export default {
  data () {
    return {
      noList: false,
      checkCity: false,
      cities: [],
      places: []
    }
  },
  components: {
    'select-option': SelectOption
  },
  methods: {
    getPlaceInfo (pp) {
      this.checkCity = true
      this.places = pp
    },
    isNoList (nn) {
      this.noList = nn
    }
  }
}
</script>

<style>
  #btn{
    color: #fff;
    background-color: #64b99f;
    font-size: 26px;
    border-radius: 8px;
  }
  .sel{
    padding: 3px;
    font-size: 20px;
    color: #64b99f;
    border: 2px solid #64b99f;
    border-radius: 6px;
    box-sizing: content-box;
  }
  #noAttr{
    font-size: 26px;
  }
  hr{
    border: none;
    border-top: 3px dotted #64b99f;
    color: #fff;
    height: 1px;
    width: 70%;
  }
  .illu{
    width: 80px;
    height: 35px;
  }
</style>
