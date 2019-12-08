<template>
  <div class="MainPage" style="background-image: url('https://i.imgur.com/p87gU8u.jpg');backgound-size:cover;-webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;">
    <li class="triplan-li">
      <router-link to="/attractionlist" id="menu1">
        <img id="illu1" src="../assets/menu1.png">
      </router-link>
      <img id="illu2" src="../assets/menu2.png" @click="showModal = true">
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Select your trip date</h3>
      </modal>

      <router-link to="/shareplan" id="menu3">
        <img id="illu3" src="../assets/menu3.png">
      </router-link>
    </li>
    <br>
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
  components: {
    Modal: Modal
  }
}
</script>

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
  #menu1, #menu2, #menu3 {
    width: 200px;
    height: 200px;
    border: 0;
    margin: 3rem 5rem;
    background-color: #ffffff;
  }

  #illu1, #illu2, #illu3 {
    width: 200px;
    height: 200px;
    cursor: pointer;
  }
  .MainPage{
    height:100vh;
  }
  .triplan-li {
    margin-top: 15%;
  }
</style>
