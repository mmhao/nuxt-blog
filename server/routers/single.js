const router = require('koa-router')();

let singleC = require('../controller/single.js');
let adminPassportMid = require('../middleware/adminPassport')

// about contact
module.exports = (app) => {
  router.prefix('/api/single')

  router.use('/', adminPassportMid)

  // // 列表
  // router.get('/', singleC.getSingleList)
  //
  // // 单个
  // router.post('/', singleC.createSingle)
  // router.delete('/:id', singleC.deleteSingle)
  router.put('/', adminPassportMid, singleC.updateSingle)
  router.get('/', singleC.getSingleDetail)



  app.use(router.routes(), router.allowedMethods())
}
