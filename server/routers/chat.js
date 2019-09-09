const router = require('koa-router')();

let chatC = require('../controller/chat.js');
let adminPassport = require('../middleware/adminPassport')

module.exports = (app) => {
  router.prefix('/api/chat')

  router.use('/', adminPassport)

  // 列表
  router.get('/', chatC.getChatList)

  // 单个
  router.post('/', chatC.createChat)
  router.delete('/:id', chatC.deleteChat)
  router.put('/:id', chatC.updateChat)
  router.get('/:id', chatC.getChatDetail)



  app.use(router.routes(), router.allowedMethods())
}
