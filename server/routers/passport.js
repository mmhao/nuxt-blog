const router = require('koa-router')();
let passportC = require('../controller/passport.js');


module.exports = (app) => {
  router.prefix('/api')

  // 后台通行证
  router.post('/passport/admin', passportC.createAdminToken)
  router.delete('/passport/admin', passportC.deleteAdminToken)

  // 前台台通行证
  router.post('/passport/web', passportC.createWebToken)
  router.delete('/passport/web', passportC.deleteWebToken)


  app.use(router.routes(), router.allowedMethods())
}
