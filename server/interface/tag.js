const axios = require('./utils/axios.js')
const _ = require('lodash')

module.exports = {
    postList: (options) => {
      let url = '/api/tag'
      const opts = _.merge({}, options || {})

      url = url + '/' + encodeURI(opts.params.tag) + '/post'
      delete opts.params.tag
      return axios.get(url, opts)
    },

}
