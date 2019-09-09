module.exports = async function (ctx, next) {
  let resp = {code: 40000, message: '请先进行登录'}

  if (!ctx.session.adminInfo) {
    ctx.body = resp
    return resp
  }
  await next()
  }
