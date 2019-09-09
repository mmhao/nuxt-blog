const axios = require('./utils/axios.js')
const _ = require('lodash')

module.exports = {
    postList: (options) => {
      let url = '/api/post'
      const opts = _.merge({}, options || {})

      return axios.get(url, opts)
    },

}
