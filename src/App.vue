<template>
  <div id="app">
    <div class="navbar navbar-light navbar-expand-md fixed-top myfont" style="background-color: rgba(255, 255, 255, 0.50)">
      <a href="/" class="navbar-brand">TRIPLAN</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/attractionlist" class="nav-link">LIST</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shareplan" class="nav-link" >공유 게시판</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">ABOUT</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <div v-if="isLoggedIn" class="navbar-nav">
          <li class="nav-item">
            <router-link to="/mypage" class="nav-link">MY PAGE</router-link>
          </li>
          <li class="nav-item">
            <a @click="logout" class="nav-link">SIGN OUT</a>
          </li>
        </div>
        <div v-else class="navbar-nav">
          <li class="nav-item">
            <router-link to='/login' class="nav-link">
              SIGN IN
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to='/signup' class="nav-link">
              SIGN UP
            </router-link>
          </li>
        </div>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Modal from './components/MyModal.vue'

export default {
  name: 'App',
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('removeUser')
    }
  },
  computed: {
    isLoggedIn: function () {
      if (this.$store.state.user === undefined) {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    Modal: Modal
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .myfont {
    font-family: 'Nanum Pen Script', cursive !important;
    font-size: 20px;
  }
</style>
