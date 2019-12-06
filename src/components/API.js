function httpTest ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/users/',
    data
  })
}

function loginAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/users/login',
    data
  })
}

function registerAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/users/signup',
    data
  })
}

function checkingOverlap ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/users/overlap',
    data
  })
}

function getCountry ($http, host, data) {
  return $http({
    method: 'get',
    url: host + '/trip_plan',
    data
  })
}

function getCountryPositionAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/trip_plan/makeplan',
    data
  })
}

function getCountryTourList ($http, host, data) {
  return $http({
    method: 'get',
    url: host + '/trip_plan/makeplan',
    data
  })
}

function getCountryAPI ($http, host, id) {
  return $http({
    method: 'get',
    url: host + `/trip_list/continent/${id}`
  })
}

function getCityAPI ($http, host, id) {
  return $http({
    method: 'get',
    url: host + `/trip_list/country/${id}`
  })
}

function getPlaceAPI ($http, host, id) {
  return $http({
    method: 'get',
    url: host + `/trip_list/place/${id}`
  })
}
function searchTourAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: host + `/share_plan`,
    data
  })
}
function detailTourAPI ($http, host, id) {
  return $http({
    method: 'get',
    url: host + `/detail_tour/${id}`
  })
}

// noinspection JSUnusedGlobalSymbols
export default {
  httpTest,
  loginAPI,
  registerAPI,
  checkingOverlap,
  getCountry,
  getCountryTourList,
  getCountryPositionAPI,
  getCountryAPI,
  getCityAPI,
  getPlaceAPI,
  searchTourAPI,
  detailTourAPI
}
