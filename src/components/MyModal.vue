<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <!--              default header-->
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <!--              default body-->
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <!--              default footer-->

            </slot>
          </div>
          <vue-hotel-datepicker
            :value="date"
            @confirm="getDate"/>
          <input type="text" v-model="title" placeholder="title"><br>
          <br>
          <br>
          <select-option
            :until-country=true
            @select-country="getCountryInfo"
            />
          <br><br>
          <button class="modal-default-button" v-on:click="clickMakePlan()">Make Plan!</button>
          <button class="modal-default-button" @click="$emit('close')">close
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
      title: ''
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
    },
    async clickMakePlan () {
      const data = {
        country_id: this.country_id
      }
      const res = await API.getCountryPositionAPI(this.$http, this.$env.apiUrl, data).catch(() => {
      })

      const countryInfo = {
        country_id: this.country_id,
        lat: res.data.country_lat,
        long: res.data.country_long
      }

      this.$store.commit('saveTitle', this.title)
      this.$store.commit('saveDateInfo', this.date)
      this.$store.commit('saveCountryPosition', countryInfo)
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
    float: right;
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
</style>
