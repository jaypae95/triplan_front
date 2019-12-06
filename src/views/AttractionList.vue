<template>
  <div>
    <p>Attraction List Page</p>
    <router-link to="/">Go To Main</router-link>
    <br>
    <button v-on:click="buttonClick">dd</button>
  </div>
</template>
<script>
export default {
  methods: {
    buttonClick () {
      this.check(this.$http, this.$env.apiUrl)
    },
    check ($http, host) {
      return $http({
        method: 'get',
        url: host + '/trip_list/continent/1'
      })
    }
  }
}
</script>
