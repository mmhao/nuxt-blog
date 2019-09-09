const axios = require('./utils/axios.js')
const _ = require('lodash')

module.exports = {
  login: (options, config) => {
    let url = '/api/passport/admin'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})

    return axios.post(url, opts, conf)
  },
  logout: (options) => {
    let url = '/api/passport/admin'
    const opts = _.merge({}, options || {})
    //console.log('ooo', opts)
    return axios.delete(url, opts)
  },
  loginWeb: (options, config) => {
    let url = '/api/passport/web'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})

    return axios.post(url, opts, conf)
  },
  logoutWeb: (options) => {
    let url = '/api/passport/web'
    const opts = _.merge({}, options || {})
    //console.log('ooo', opts)
    return axios.delete(url, opts)
  },

}
