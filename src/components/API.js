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
    url: host + '/users/signup',
    data
  })
}
// noinspection JSUnusedGlobalSymbols
export default {
  httpTest,
  loginAPI,
  registerAPI,
  checkingOverlap
}
