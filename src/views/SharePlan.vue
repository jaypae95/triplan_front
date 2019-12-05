<template>
  <div class="example ex1">
    <h1>Share plan</h1>
    <label class="radio red">
      <input type="radio" name="group1" v-model="tour_type" value=0/>
      <span>혼자서</span>
    </label>
    <label class="radio blue">
      <input type="radio" name="group1" v-model="tour_type" value=1/>
      <span>친구들</span>
    </label>
    <label class="radio orange">
      <input type="radio" name="group1" v-model="tour_type" value=2/>
      <span>가족</span>
    </label>
    <label class="radio orange">
      <input type="radio" name="group1" v-model="tour_type" value=3/>
      <span>연인</span>
    </label>
    <br><br>
    <label class="radio red">
      <input type="radio" name="group2"/>
      <span>봄</span>
    </label>
    <label class="radio blue">
      <input type="radio" name="group2"/>
      <span>여름</span>
    </label>
    <label class="radio orange">
      <input type="radio" name="group2"/>
      <span>가을</span>
    </label>
    <label class="radio orange">
      <input type="radio" name="group2"/>
      <span>겨울</span>
    </label>
    <br><br>
    <button v-on:click="search()"> search</button>
    <br>
    {{idPlan}}
    <br><br>
    <router-link to='/'>
      <img id="illu" src="../assets/gotoHome.png">
    </router-link>
  </div>
</template>
<script>
  import API from '../components/API'

  export default {
    data() {
      return {
        tour_type: '',
        idPlan: ''
      }
    },
    methods:
      {
        search: function () {
          const tour_type = this.tour_type;
        }


      }
  }
</script>

<style>

  h1 {
    font-family: "DX경필고딕";
    size: 70px;
  }

  #illu {
    width: 80px;
    height: 35px;
  }

  .example {
    margin: 20px;
  }

  .example input {
    display: none;
  }

  .example label {
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
  }

  .ex1 span {
    display: block;
    padding: 5px 10px 5px 25px;
    border: 2px solid #ddd;
    border-radius: 5px;
    position: relative;
    transition: all 0.25s linear;
  }

  .ex1 span:before {
    content: '';
    position: absolute;
    left: 5px;
    top: 50%;
    -webkit-transform: translatey(-50%);
    transform: translatey(-50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ddd;
    transition: all 0.25s linear;
  }

  .ex1 input:checked + span {
    background-color: #fff;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  }

  .ex1 .red input:checked + span {
    color: red;
    border-color: red;
  }

  .ex1 .red input:checked + span:before {
    background-color: red;
  }

  .ex1 .blue input:checked + span {
    color: blue;
    border-color: blue;
  }

  .ex1 .blue input:checked + span:before {
    background-color: blue;
  }

  .ex1 .orange input:checked + span {
    color: orange;
    border-color: orange;
  }

  .ex1 .orange input:checked + span:before {
    background-color: orange;
  }
</style>
