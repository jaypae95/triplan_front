<template>
  <div class="MainPage">
    <div id="lo1">
        <li>
      <router-link to='/LogIn'>
        <img id="loli" src="../assets/login.png">
      </router-link>
       <router-link to='/SignUp'>
        <img id="loli" src="../assets/add.png">
       </router-link>
        </li>
    </div>
    <li>
      <router-link to="/AttractionList" id="menu1">
        <img id="illu1" src="../assets/menu1.png">
      </router-link>

        <img id="illu2" src="../assets/menu2.png" @click="showModal = true">
        <modal v-if="showModal" @close="showModal = false">
          <h3 slot="header">Select your trip date</h3>
        </modal>

      <router-link to="/SharePlan" id="menu3">
        <img id="illu3" src="../assets/menu3.png">
      </router-link>
    </li>
    <br>
    <br>

    <router-link to="/MyPage">Go To MyPage</router-link><br><br>
    <router-link to="/ConfirmPlan">Go To ConfirmPlan Page</router-link><br>

  </div>
</template>

<script>
import Modal from '../components/MyModal.vue'

export default {
  name: 'MainPage',
  data () {
    return {
      showModal: false
    }
  },
  methods: {
  },
  computed: {
  },
  components: {
    Modal: Modal
  }
}
</script>
<!---->
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0px 10px;
  }
  a {
    color: #42b983;
  }
  #menu1, #menu2, #menu3{
    width: 200px;
    height: 200px;
    border: 0;
    margin: 3rem 5rem;
    background-color: #ffffff;
  }
  #illu1, #illu2, #illu3{
    width: 200px;
    height:200px;
  }
  #lo1{
    text-align: right;
  }
  #login{
    width: 90px;
    height: 33px;
    border:0;
    background-color: #ffffff;

  }
  #loli{
    width: 80px;
    height: 33px;
    text-align: right;
  }
</style>
