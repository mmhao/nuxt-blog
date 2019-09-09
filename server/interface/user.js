const axios = require('./utils/axios.js')
const _ = require('lodash')

module.exports = {
  createUser: (options, config) => {
    let url = '/api/user'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})

    return axios.post(url, opts, conf)
  },

}
