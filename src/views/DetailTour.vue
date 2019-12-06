<template>
  <div>
    <p id="title">{{tours.title}}</p>
    <p id="date">{{tours.depart_day}} ~ {{tours.arrive_day}}</p>
    <b v-if="tours.tour_type==0">
      혼자여행
    </b>
    <b v-else-if="tours.tour_type==1">
      친구와 여행
    </b>
    <b v-else-if="tours.tour_type==2">
      가족과 여행
    </b>
    <b v-else-if="tours.tour_type==3">
      연인과 여행
    </b>
    <b v-if="tours.season==0">
      봄
    </b>
    <b v-else-if="tours.season==1">
      여름
    </b>
    <b v-else-if="tours.season==2">
      가을
    </b>
    <b v-else-if="tours.season==3">
      겨울
    </b>
    <p>{{tours.country_name}}</p>
    <div  v-for="(day,index) in tours.dayplan" :key="day.dayplan_id" style="text-align: center;position: relative;vertical-align: middle;">
      <div>
        <p>Day {{index+1}} {{day.city_name}}</p>
        <div v-for="place in day.place" :key="place.place_name" style="display: table-cell">
          <article >
            <p>{{place.place_name}}</p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../components/API'
export default {
  data () {
    return {
      tours: {}
    }
  },
  created: function () {
    var data = this.$route.params.id
    console.log(data)
    API.detailTourAPI(this.$http, this.$env.apiUrl, data).then(res => {
      this.tours = res.data
      console.log(res.data)
      if (res.data.success === true) {
        this.$router.push('/')
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
  *{
    font-family: "DX경필고딕";
  }
article{
  width:150px;
  height:150px;
  border: 5px solid #42b983;
  border-radius:50%;
  float:left;
  text-align: center;
  align-content: center;
  align-items: center;
  vertical-align: middle;
}
</style>
