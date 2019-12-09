<template>
  <div class="Apple">
  </div>
</template>

<script>
import MarkerClusterer from '@google/markerclusterer'
import gmapsInit from '../utils/gmaps'
export default {
  name: `Apple`,
  data () {
    return {
      lat2: '',
      lng2: ''
    }
  },
  async mounted () {
    try {
      const locations = [
        {
          position: {
            lat: this.$store.state.country.lat,
            lng: this.$store.state.country.long
          }
        }
      ]
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$el)
      const newLat = this.$store.state.country.lat
      const newLog = this.$store.state.country.long
      geocoder.geocode({location: new google.maps.LatLng(newLat, newLog)}, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status)
        }
        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
      })
      const markerClickHandler = (marker) => {
        map.setZoom(24)
        map.setCenter(marker.getPosition())
      }
      const markers = locations
        .map((location) => {
          const marker = new google.maps.Marker({ ...location, map })
          marker.addListener(`click`, () => {
            markerClickHandler(marker)
          })
          return marker
        })
        // eslint-disable-next-line no-new
      new MarkerClusterer(map, markers, {
        imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
}
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  .Apple {
    width: 57%;
    height: 70vh;
    float: left;
  }
</style>
