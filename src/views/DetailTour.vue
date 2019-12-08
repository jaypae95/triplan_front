<template>
  <div id="app">
    <p id="title" class="display-4">{{tours.title}}</p>
    <p id="date" >{{tours.depart_day}} ~ {{tours.arrive_day}}</p>
    <button class="btn btn-outline-info" v-if="tours.tour_type==0">
      혼자여행
    </button>
    <button class="btn btn-outline-info" v-else-if="tours.tour_type==1">
      친구와 여행
    </button>
    <button class="btn btn-outline-info" v-else-if="tours.tour_type==2">
      가족과 여행
    </button>
    <button class="btn btn-outline-info" v-else-if="tours.tour_type==3">
      연인과 여행
    </button>
    <button class="btn btn-outline-info" v-if="tours.season==0">
      봄
    </button>
    <button class="btn btn-outline-info" v-else-if="tours.season==1">
      여름
    </button>
    <button class="btn btn-outline-info" v-else-if="tours.season==2">
      가을
    </button>
    <button class="btn btn-outline-info" v-else-if="tours.season==3">
      겨울
    </button>
    <br><br>
    <p id="country" class="alert alert-success">{{tours.country_name}}</p>
    <div class= "sec" v-for="(day,index) in tours.dayplan" :key="day.dayplan_id">
      <table>
        <tr>
          <td>
            <p class="tourList list-group-item-warning">Day {{index+1}} {{day.city_name}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <div v-for="place in day.place" :key="place.place_name" style="display: table-cell;padding: 20px">
              <section v-on:mouseover="doMouseOver($event)" v-on:mouseleave="doMouseLeave($event)" v-bind:style="{'backgroundImage': `url(${place.place_img}`}" >
                <p class="nohover badge badge-pill badge-success">{{place.place_name}}</p>
              </section>
            </div>
          </td>
        </tr>
      </table>
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
  },
  methods: {
    doMouseOver (e) {
      let target = e.target.childNodes[0].innerHTML
      e = e || window.event
      let x = e.pageX
      let y = e.pageY - 100
      var dayIndex
      var placeIndex
      this.tours.dayplan.forEach(function (element, index) {
        var temp = element.place.findIndex(function (item) {
          return item.place_name === target
        })
        if (temp !== -1) {
          dayIndex = index
          placeIndex = temp
        }
      })

      let article = document.createElement('article')
      article.setAttribute('style', 'position:absolute;background-color:#000000;background: rgba(0, 0, 0, 0.5);width:200px;height:200px;left:' + x + 'px;top:' + y + 'px;color:#ffffff;fonr-size:larger')
      var obj = this.tours.dayplan[dayIndex].place[placeIndex]
      article.innerHTML = ('<p style="font-size:x-large;">' + obj.place_name + '</p>')
      article.innerHTML += ('<p>' + obj.place_explanation + '</p>')
      document.getElementById('app').appendChild(article)
    },
    doMouseLeave (e) {
      var count = document.getElementById('app').childElementCount
      console.log(count)
      for (var i = 0; i < count; i++) {
        document.getElementById('app').removeChild(document.getElementsByTagName('article')[i])
      }
    }
  }
}
</script>

<style scoped>
  @import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
  #app {
    margin: 15% auto auto auto
  }
  *{
    font-family: 'Jeju Gothic', sans-serif;
  }
section{
  width:150px;
  height:150px;
  border: 5px solid #42b983;
  border-radius:50%;
  float:left;
  text-align: center;
  align-content: center;
  align-items: center;
  vertical-align: middle;
  margin: 30px;
  padding:30px
}
  .nohover {
    pointer-events: none;
    text-align: center;
    align-content: center;
    align-items: center;
    vertical-align: middle;
  }
table {
  margin: 0px auto
}
  #title{
  }
  #date{
    font-size: 30px;
  }
  #country{
    font-size: 30px;
  }
  b{

  }
</style>
