const axios = require('./utils/axios.js')
const _ = require('lodash')

module.exports = {
  createArticle: (options, config) => {
    let url = '/api/article'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})
    //console.log('ooo', opts)
    return axios.post(url, opts, conf)
  },
  deleteArticle: (options) => {
    let url = '/api/article'
    const opts = _.merge({}, options || {})

    url = url + '/' + opts.data.id
    delete opts.data.id

    return axios.delete(url, opts)
  },
  updateArticle: (options, config) => {
    let url = '/api/article'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})

    url = url + '/' + opts.id
    delete opts.id

    return axios.put(url, opts, conf)
  },
  articleList: (options) => {
    let url = '/api/article'
    const opts = _.merge({}, options || {})

    return axios.get(url, opts)
  },
  articleDetail: (options) => {
    let url = '/api/article'

    const opts = _.merge({}, options || {})
    url = url + '/' + opts.params.id
    delete opts.params.id
    return axios.get(url, opts)
  },

}
