const router = require('koa-router')();

let tagC = require('../controller/tag.js');
let adminPassport = require('../middleware/adminPassport')

module.exports = (app) => {
  router.prefix('/api/tag')

  //router.use('/', adminPassport)

  // 列表
  router.get('/:tag/post', tagC.getPostList)

  app.use(router.routes(), router.allowedMethods())
}
