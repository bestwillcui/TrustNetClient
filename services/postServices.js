import Api from './api'

export default {
  getBoosts(params, headers) {
    return Api().get('/boosts/?limit=' + params.limit + '&offset=' + params.offset, {
      withCredentials: true,
      headers: headers
    })
  }

}
