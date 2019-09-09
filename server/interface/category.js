const axios = require('./utils/axios.js')
const _ = require('lodash')

module.exports = {
  createCategory: (options, config) => {
    let url = '/api/category'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})
    //console.log('ooo', opts)
    return axios.post(url, opts, conf)
  },
  deleteCategory: (options) => {
    let url = '/api/category'
    const opts = _.merge({}, options || {})

    url = url + '/' + opts.data.id
    delete opts.data.id

    return axios.delete(url, opts)
  },
  updateCategory: (options, config) => {
    let url = '/api/category'
    const opts = _.merge({}, options || {})
    const conf = _.merge({}, config || {})

    url = url + '/' + opts.id
    delete opts.id

    return axios.put(url, opts, conf)
  },
  categoryList: (options) => {
    let url = '/api/category'
    const opts = _.merge({}, options || {})

    return axios.get(url, opts)
  },
  categoryDetail: (options) => {
    let url = '/api/category'

    const opts = _.merge({}, options || {})
    url = url + '/' + opts.params.id
    delete opts.params.id
    return axios.get(url, opts)
  },


}
