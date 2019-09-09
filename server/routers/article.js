const router = require('koa-router')();

let articleC = require('../controller/article.js');
let adminPassportMid = require('../middleware/adminPassport')

module.exports = (app) => {
  router.prefix('/api/article')

  // router.use('/', adminPassportMid)

  // 列表
  router.get('/', articleC.getArticleList)

  // 单个
  router.post('/', adminPassportMid,  articleC.createArticle)
  router.delete('/:id', adminPassportMid, articleC.deleteArticle)
  router.put('/:id', adminPassportMid, articleC.updateArticle)
  router.get('/:id', articleC.getArticleDetail)



  app.use(router.routes(), router.allowedMethods())
}
