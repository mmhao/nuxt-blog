let userM = require('../model/schema/user');
let ipM = require('../model/schema/ip');
//let adminM = mongoose.model('admin')
let to = require('await-to-js').default
let Joi = require('joi')


module.exports = {
  createUser: async (ctx, next) => {
    let resp = {
      code: 20001,
      message: '参数错误'
    }

    let {account, password, vertycode} = ctx.request.body

    let verifyRule = Joi.object({
        account: Joi.string().trim().alphanum().min(3).max(30).required(),
        password: Joi.string().trim().alphanum().min(3).max(30).required(),
        vertycode: Joi.string().trim().required(),
    })


    let verifyResult = Joi.validate({account, password, vertycode}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    // 验证码
    let sessionVertycode = ctx.session.vertycode
    if (sessionVertycode !== vertycode) {
      resp.message = '验证码错误'
      resp.message1 = 'session:' + sessionVertycode + " vvv:" + vertycode
      ctx.body = resp
      return
    }


    let [dbError, dbResult] = await to(userM.findOne({account}))


    if (dbError) {
      resp.message = '查询出错'
      ctx.body = resp
      return
    }

    // 有这个账号-还没验证密码
    if (dbResult) {
        resp.message = '用户已存在'
        ctx.body = resp
        return
      }

      let [dbUserError, dbUserResult] = await to(userM.create({account, password}))

      if (dbUserError) {
        resp.message = '注册出错'
        ctx.body = resp
        return
      }

      resp.message = '注册成功'
      resp.code = 20000
      dbUserResult.password = ''

      ctx.session.userInfo = dbUserResult

      ctx.body = resp

  },

}
