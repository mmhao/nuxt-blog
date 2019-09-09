const axios = require('./utils/axios.js')
const _ = require('lodash')

module.exports = {
  updateSingle: (options, config) => {
    let url = '/api/single'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})

    return axios.put(url, opts, conf)
  },
  singleDetail: (options) => {
    let url = '/api/single'

    const opts = _.merge({}, options || {})
    return axios.get(url, opts)
  },

}
