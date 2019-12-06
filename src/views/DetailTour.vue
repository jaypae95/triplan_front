<template>
  <div>
    {{this.tour}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      tour: []
    }
  },
  created: function () {
    var id = this.$route.params.idPlan
    this.$http.get(`/detailtour/${id}`).then(response => {
      this.tour = response.data[0]
    })
  }
}
</script>

<style scoped>

</style>
