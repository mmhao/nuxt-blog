const mongoose = require('mongoose')
const DB_CONF = require('../config/config.js')
const glob = require('glob')
const {resolve} = require('path')

mongoose.Promise = global.Promise

// exports.initSchemas = (mongoose) => {
//   let list = glob.sync(resolve(__dirname, './Schema', '**/*.js'))
//   console.log('list', list)
//   list.forEach(require)
// }

let dbUrl = `mongodb://${DB_CONF.host}:${DB_CONF.port}/${DB_CONF.database}`
exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(dbUrl)

    mongoose.connection.on('disconnected', ()=> {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(dbUrl)
      } else {
        throw new Error('数据库挂了，清看看怎么回事吧')
      }
    })

    mongoose.connection.on('error', (error)=> {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(dbUrl)
      } else {
        throw new Error('数据库挂了，清看看怎么回事吧')
      }
    })

    mongoose.connection.on('open', ()=> {
      resolve(true)
      console.log('mongodb connected successfully')
    })
  })
}
