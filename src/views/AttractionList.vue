<template>
  <div id="attractionlist" class="myfont">
    <h1>Attraction List Page</h1>
    <select-option
      :until-country=false
      @select-city="getPlaceInfo"
      @is-no-list="isNoList"/>
    <router-link to='/'>
      <img class="illu" src="../assets/gotoHome.png">
    </router-link>
    <br>
    <div v-if="checkCity">
      <div v-if="noList">
        <p id="noAttr">No Attraction!</p>
      </div>
      <ul v-for="place in places" v-bind:key="place.place_name"><b>{{place.place_name}}</b><br>
        <img class="img" :src=place.place_img>
        <p>{{place.place_explanation}}</p>
        <br>
        <hr>
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
  .sel {
    padding: 3px;
    font-size: 20px;
    color: #64b99f;
    border: 2px solid #64b99f;
    border-radius: 6px;
    box-sizing: content-box;
  }

  #noAttr {
    font-size: 26px;
  }

  #attractionlist {
    margin: 10% auto auto auto;
  }

  hr {
    border: none;
    border-top: 3px dotted #64b99f;
    color: #fff;
    height: 1px;
    width: 70%;
  }

  .illu {
    width: 80px;
    height: 35px;
    margin: 4px 0px;
  }

  .img {
    width: 550px;
    height: auto;
  }

  .myfont {
    font-family: 'Nanum Pen Script', cursive !important;
    font-size: 20px;
  }
</style>
