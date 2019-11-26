<!--<script type="text/x-template" id="modal-template">-->
<!--<transition name="modal">-->
<!--  <div class="modal-mask">-->
<!--    <div class="modal-wrapper">-->
<!--      <div class="modal-containter">-->
<!--        <div class ="modal-body">-->
<!--          <slot name="id">-->
<!--              id-->
<!--          </slot>-->
<!--          <slot name="password">-->
<!--              password-->
<!--          </slot>-->
<!--          <button class="modal-default-button">-->
<!--            ok-->
<!--          </button>-->
<!--        </div>-->
<!--        <div class="modal-footer">-->
<!--          <slot name="footer">-->
<!--              find id/password-->
<!--          </slot>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</transition>-->
<!--</script>-->

<template>
  <div class="hello">
    <div id="lo1">
      <button id="login" @click="showmodal=true">
        <img id="loli" src="../assets/login.png">
      </button>
      <modal v-if="showmodal" @close="showmodal= false">
        <h3 slot="header">login</h3>
      </modal>
    </div>
    <h1>{{ msg }}</h1>
    <li>
      <button id="menu1" v-on:click="btn(e)">
        <img id="illu1" src="../assets/menu1.png">
      </button>
      <button id="menu2">
        <img id="illu2" src="../assets/menu2.png">
      </button>
      <button id="menu3">
        <img id="illu3" src="../assets/menu3.png">
      </button>
    </li>
  </div>
</template>

<script>
import httpRequest from './httpRequest'
// import Vue from 'vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Triplan!'
      // showmodal:false
    }
  },
  methods: {
    async onClickSendData () {
      const data = {
        email: 'test@test.test',
        gender: 'male'
      }
      let res = await httpRequest.httpTest(this.$http, this.$env.apiUrl, data).catch((e) => { console.log(e) })
      console.log(res.data['email'])
      console.log(res.data['gender'])
    }
  },
  computed: {
    routerTestURL () {
      return '/routertest'
    }
  }
}

// Vue.component('modal',{
//   tempate:'#modal-template'
// })

</script>

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
  /*.modal-mask {*/
  /*  position: fixed;*/
  /*  z-index: 9998;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  background-color: rgba(0, 0, 0, .5);*/
  /*  display: table;*/
  /*  transition: opacity .3s ease;*/
  /*}*/

  /*.modal-wrapper {*/
  /*  display: table-cell;*/
  /*  vertical-align: middle;*/
  /*}*/

  /*.modal-container {*/
  /*  width: 300px;*/
  /*  margin: 0px auto;*/
  /*  padding: 20px 30px;*/
  /*  background-color: #fff;*/
  /*  border-radius: 2px;*/
  /*  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);*/
  /*  transition: all .3s ease;*/
  /*  font-family: Helvetica, Arial, sans-serif;*/
  /*}*/

  /*.modal-header h3 {*/
  /*  margin-top: 0;*/
  /*  color: #42b983;*/
  /*}*/

  /*.modal-body {*/
  /*  margin: 20px 0;*/
  /*}*/

  /*.modal-default-button {*/
  /*  float: right;*/
  /*}*/

  /*!**/
  /* * The following styles are auto-applied to elements with*/
  /* * transition="modal" when their visibility is toggled*/
  /* * by Vue.js.*/
  /* **/
  /* * You can easily play with the modal transition by editing*/
  /* * these styles.*/
  /* *!*/

  /*.modal-enter {*/
  /*  opacity: 0;*/
  /*}*/

  /*.modal-leave-active {*/
  /*  opacity: 0;*/
  /*}*/

  /*.modal-enter .modal-container,*/
  /*.modal-leave-active .modal-container {*/
  /*  -webkit-transform: scale(1.1);*/
  /*  transform: scale(1.1);*/
  /*}*/

</style>
