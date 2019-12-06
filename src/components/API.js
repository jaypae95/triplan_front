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
// noinspection JSUnusedGlobalSymbols
export default {
  httpTest,
  loginAPI,
  registerAPI,
  checkingOverlap,
  getCountry,
  getCountryTourList,
  getCountryPositionAPI
}
