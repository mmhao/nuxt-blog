const router = require('koa-router')();
var svgCaptcha = require('svg-captcha');

// about contact
module.exports = (app) => {
  router.prefix('/api/vertycode')

  router.get('/:t', (ctx, next) => {
    var c = svgCaptcha.create();
    ctx.session.vertycode = c.text
    ctx.type = 'svg'; // 响应的类型
    ctx.body = c.data
  })



  app.use(router.routes(), router.allowedMethods())
}
