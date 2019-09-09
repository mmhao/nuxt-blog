const Koa = require('koa')
const consola = require('consola')
const json = require('koa-json')
const { Nuxt, Builder } = require('nuxt')

const mongoose = require('mongoose')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session')
const {connect} = require('./model/init.js')
//const adminPassportMiddle = require('./middleware/admin/passport.js')

;(async () => {
  await connect()
})()

//const DB_CONF = require('./config/config.js')

const entryRouter =  require('./routers/index.js')


const app = new Koa()
app.keys = ['mt', 'keykkkkk'] // cookie的加密
app.use(session({
  key: 'mt' // session加密
}, app))

//  方便把post请求数据直接ctx.request.body得到
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 方便响应直接转换各种数据为字符串
app.use(json())

// 路由中间件，验证后端有没有登录
//app.use(adminPassportMiddle)


// app.use((ctx) => {
//   //console.log('ctxctx', ctx)
// })

//let dbUrl = `mongodb://${DB_CONF.user}:${DB_CONF.password}@${DB_CONF.host}:${DB_CONF.port}/${DB_CONF.database}`
//let dbUrl = `mongodb://${DB_CONF.host}:${DB_CONF.port}/${DB_CONF.database}`

// mongoose.connect(dbUrl)
//   mongoose.connection.on("error", function (error) {
//       console.log("数据库连接失败：" + error);
//   });
//   mongoose.connection.on("open", function () {
//       console.log("------数据库连接成功！------");
//   });
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // 使用路由
  entryRouter(app)

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
