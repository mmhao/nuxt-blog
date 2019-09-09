const router = require('koa-router')();
let userC = require('../controller/user.js');


module.exports = (app) => {
  router.prefix('/api')

  // 后台通行证
  router.post('/user', userC.createUser)


  app.use(router.routes(), router.allowedMethods())
}
