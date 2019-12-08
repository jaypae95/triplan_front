<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width:400px">
          <h1 class="myfont">일정 만들기</h1>
          <div style="margin:5%">
            <vue-hotel-datepicker
            :value="date"
            @confirm="getDate"/>
          </div>
          <div style="margin:5%">
            <input type="text" v-model="title" placeholder="Your Trip Title"><br>
          </div>
          <div style="margin:5%">
            <input type="radio" v-model="tour_type" placeholder="writeType" name="tourType" value=0> 혼자서
            <input type="radio" v-model="tour_type" placeholder="writeType" name="tourType" value=1> 친구들
            <input type="radio" v-model="tour_type" placeholder="writeType" name="tourType" value=2> 가족
            <input type="radio" v-model="tour_type" placeholder="writeType" name="tourType" value=3> 연인
          </div>
          <select-option
            :until-country=true
            @select-country="getCountryInfo"/>
          <div v-if="checkCountry">
            <button class="modal-default-button" v-on:click="clickMakePlan()">Make Plan!</button>
          </div>
          <button class="modal-default-button" @click="$emit('close')">Close
          </button>
          <br>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import API from '../components/API'
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker'
import SelectOption from '../components/SelectOption'

export default {
  name: 'mymodal',
  components: {
    'vue-hotel-datepicker': VueHotelDatepicker,
    'select-option': SelectOption
  },
  data () {
    return {
      date: '',
      long: '',
      lat: '',
      tmpdata: '',
      country_id: '',
      title: '',
      tour_type: '',
      season: '',
      checkCountry: false
    }
  },
  methods: {
    getDate (date) {
      date.start = date.start.replace('/', '-')
      date.start = date.start.replace('/', '-')
      date.end = date.end.replace('/', '-')
      date.end = date.end.replace('/', '-')
      this.date = date
    },
    getCountryInfo (data) {
      this.country_id = data
      this.checkCountry = true
    },
    async clickMakePlan () {
      if (this.date.start >= 3 && this.date.start <= 5) {
        this.season = 0
      } else if (this.date.start >= 6 && this.date.start <= 8) {
        this.season = 1
      } else if (this.date.start >= 9 && this.date.start <= 11) {
        this.season = 2
      } else {
        this.season = 3
      }
      const data = {
        depart_day: this.date.start,
        arrive_day: this.date.end,
        title: this.title,
        tour_type: this.tour_type,
        season: this.season,
        country_id: this.country_id
      }
      const res = await API.getCountryPositionAPI(this.$http, this.$env.apiUrl, data).catch((e) => {
        alert('모든 필드에 값을 채우세요.')
      })

      const countryInfo = {
        country_id: this.country_id,
        lat: res.data.country_lat,
        long: res.data.country_long
      }

      this.$store.commit('saveTitle', this.title)
      this.$store.commit('saveDateInfo', this.date)
      this.$store.commit('saveCountryPosition', countryInfo)
      this.$store.commit('savePlanId', res.data.idPlan)
      this.$router.push('/makeplan')
    }
  }
}

</script>
<style lang="css">
  .closeModalBtn {
    color: #62acde;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #62acde;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    color: #fff;
    float: right;
    background-color: #64b99f;
    font-size: 20px;
    border-radius: 8px;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  input {
    padding: 3px;
    font-size: 20px;
    color: #64b99f;
    border: 2px solid #64b99f;
    border-radius: 6px;
    box-sizing: content-box;
  }
</style>
