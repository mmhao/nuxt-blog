const router = require('koa-router')();

let categoryC = require('../controller/category.js');
let adminPassport = require('../middleware/adminPassport')

module.exports = (app) => {
  router.prefix('/api/category')

  //router.use('/', adminPassport)

  // 列表
  router.post('/', categoryC.createCategory)
  router.get('/', categoryC.getCategoryList)

  // 单个
  router.delete('/:id', adminPassport, categoryC.deleteCategory)
  router.put('/:id', adminPassport, categoryC.updateCategory)
  router.get('/:id', categoryC.getCategoryDetail)


  app.use(router.routes(), router.allowedMethods())
}
