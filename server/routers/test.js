const router = require('koa-router')();
//let passportMiddle = require('../../middleware/passport')
let adminM = require('../model/schema/admin.js')
let ipM = require('../model/schema/ip.js')

module.exports = (app) => {
  router.prefix('/api/test')


  router.get("/", (ctx, next) => {
    ctx.body = {
      session: ctx.session.adminInfo || 'sdgeg',
      cookie: ctx.req.headers.cookie
    }
  })
  router.get("/delete", (ctx, next) => {
    ctx.session.adminInfo = null
  })
  router.get("/view", (ctx, next) => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
  })

  router.get("/add", (ctx, next) => {

    // adminDoc = new adminM()
    // adminDoc.account = 'efwre' + Math.random().toString().split('.')[1]
    // adminDoc.password = '123456'

    adminM.create({account: 'admin', password: '123456'},(error, e) => {
      if (error) {
        return console.log('error', error)
      } else {
        console.log("成功")
      }
    })
  })


  router.get("/check", async (ctx, next) => {

    // adminDoc = new adminM()
    // adminDoc.account = 'efwre' + Math.random().toString().split('.')[1]
    // adminDoc.password = '123456'
    let result = await adminM.findOne({account: 'gewaewag'})
    console.log('result', result)
    if (adminM.comparePassword('123456', result.password)) {
      console.log('yes')
    }
    else {
      console.log('nonono')
    }

  })

  router.get("/login", async (ctx, next) => {

    // adminDoc = new adminM()
    // adminDoc.account = 'efwre' + Math.random().toString().split('.')[1]
    // adminDoc.password = '123456'
    let result = await adminM.findOne({account: 'gewaewag'})
    console.log('result', result)
    if (adminM.comparePassword('123456', result.password)) {
      console.log('yes')
    }
    else {
      console.log('nonono')
    }

  })

  router.get("/xip", async (ctx, next) => {

    ipM.create({ip: '192.168.0.1', type: 'admin'},(error, e) => {
      if (error) {
        return console.log('error', error)
      } else {
        console.log("成功")
      }
    })

  })

  app.use(router.routes(), router.allowedMethods())
}
