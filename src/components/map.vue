<template>
  <div class="App">
  </div>
</template>

<script>
import MarkerClusterer from '@google/markerclusterer'
import gmapsInit from '../utils/gmaps'

const locations = [
  {
    position: {
      lat: 37.282949,
      lng: 127.045006
    }
  }
]

export default {
  name: `App`,
  async mounted () {
    try {
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$el)
      geocoder.geocode({ address: `South Korea` }, (results, status) => {
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
          marker.addListener(`click`, () => markerClickHandler(marker))
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
  .App {
    width: 100vw;
    height: 100vh;
  }
</style>
