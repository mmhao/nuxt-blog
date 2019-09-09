const router = require('koa-router')();

let postC = require('../controller/post.js');
let adminPassport = require('../middleware/adminPassport')

module.exports = (app) => {
  router.prefix('/api/post')

  //router.use('/', adminPassport)

  // 列表
  router.get('/', postC.getPostList)

  app.use(router.routes(), router.allowedMethods())
}
