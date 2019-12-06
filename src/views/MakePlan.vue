<template>
  <div class="makePlan">
    <h1>Make Plan</h1>
    <div id="div0">
    <div v-bind:key="item" v-for="item in newDays">
      <ul id="uli">
      <button id="addDay">
        Day {{item}}
      </button>
      <div v-if="item%10==0"><br></div>
      </ul>
    </div>
     <button id="addBtn" v-on:click="newAdd">+</button>
     </div>
     <br>
    <div id="div1">
      <div id="tourList">
        <p id="w1"> 관광지</p>
      </div>
      <br>
      <div v-bind:key="tour" v-for ="tour in tours">
        {{tour}}
        <br>
      </div>
    </div>
    <mapping>
    </mapping>
    <div id="div2">
      <div id="tourList">
        <p id="w1"> 코스</p>
      </div>
      <div id="show" v-bind:key="pl" v-for="pl in newPls">
        <div>

        </div>
      </div>
      <button class="btn" >저장</button>
    </div>
  </div>
</template>

<script>
import mapping from '../components/map'
var number = 0
export default {
  name: 'makePlan',
  data () {
    return {
      tours: [],
      newDays: [],
      newPls: [],
      city_id: '',
      place_id: []
    }
  },
  methods: {
    place () {
    // const res=await API.getCountryTourList( this.$http, this.$env.apiUrl, data)
    },
    newAdd () {
      console.log(this.newDays.length)
      number++
      this.newDays.push(number)
    }
  },
  components: {
    mapping
  }
}
</script>
<style>
div{
}
#uli{
  white-space: nowrap;
}
#div0{
  text-align: right;
}
#div1, #div2{
  float: left;
  width: 20%;
  height: 99vh;
   border: 4px solid #FF6D6A;
}
h1{
  size:50px;
}
#tourList{
  border: 4px solid #FF6D6A;
  background-color: #FF6D6A;
}
#seeing{
  height: auto;
}
#w1{
  color: #ffffff;
  font-weight: #ffffff;
  font-family: "DX경필고딕"
}
#show{
  height: 80%;
}
.btn{
  position: relative;
  bottom: 0;
  background-color: #FF6D6A;
}
#addDay{
  display: inline-block;
  float: left;
}
#addBtn{
  background-color: #3d3b3b;
  border: solid 3px #3d3b3b;
  border-radius: 7px;
  color: #ffffff;
}
</style>
