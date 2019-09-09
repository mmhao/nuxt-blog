let adminM = require('../model/schema/admin');
let userM = require('../model/schema/user');
let ipM = require('../model/schema/ip');
//let adminM = mongoose.model('admin')
let to = require('await-to-js').default
let Joi = require('joi')


module.exports = {
  createAdminToken: async (ctx, next) => {
    let resp = {
      code: 20001,
      message: '参数错误'
    }

    let {account, password} = ctx.request.body
    let ip = ctx.ip

    let verifyRule = Joi.object({
        account: Joi.string().trim().alphanum().min(3).max(30).required(),
        password: Joi.string().trim().alphanum().min(3).max(30).required(),
    })


    let verifyResult = Joi.validate({account, password}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }



    let [dbError, dbResult] = await to(adminM.findOne({account}))


    if (dbError) {
      ctx.body = resp
      return
    }

    // 有这个账号-还没验证密码
    if (dbResult) {
      // 对比密码
      let [ipError, ipResult] = await to(adminM.comparePassword(password, dbResult.password))
      if (ipError) {
        ctx.body = resp
      } else if(!ipResult) { // 密码不正确
        // 该ip增加登录次数来限制
        let [ipError, ipResult] = await to(ipM.incLoginAttepts({ip: ip, type: 'admin'}))
        if (ipError) {
            resp.message = ipError || 'ip出现错误'
            ctx.body = resp
            return
        }
        if (!ipResult) { // 如果还在5词内会返回false，否则返回true
          resp.message = '您已经超过登录次数，清30分钟后再次登录'
          ctx.body = resp
          return
        }
      } else {
        resp.message = '登录成功'
        resp.code = 20000
        dbResult.password = ''

        ctx.session.adminInfo = dbResult
      }
    } else {
      resp.message = '账号不存在'
    }
    ctx.body = resp

  },
  deleteAdminToken: (ctx, next) => {
    let resp = {code: 20000, message: '退出成功'}
    ctx.session.adminInfo = null
    // resp.body = {
    //   session: ctx.session.adminInfo || 'sdgeg',
    //   cookie: ctx.cookies.get('remember_82e5d2c56bdd0811318f0cf078b78bfc')
    // }
    // console.log('ctx.session.adminInfo',ctx.session.adminInfo)
    // console.log('ctx.session.resp',resp)

    //console.log('ctx.session.adminInfo',ctx.session)
    ctx.body = resp
  },
  createWebToken: async (ctx, next) => {
    let resp = {
      code: 20001,
      message: '参数错误'
    }

    let {account, password} = ctx.request.body
    let ip = ctx.ip

    let verifyRule = Joi.object({
        account: Joi.string().trim().alphanum().min(3).max(30).required(),
        password: Joi.string().trim().alphanum().min(3).max(30).required(),
    })


    let verifyResult = Joi.validate({account, password}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    
    let [dbError, dbResult] = await to(userM.findOne({account}))


    if (dbError) {
      ctx.body = resp
      return
    }

    // 有这个账号-还没验证密码
    if (dbResult) {
      // 对比密码
      let [ipError, ipResult] = await to(userM.comparePassword(password, dbResult.password))
      if (ipError) {
        ctx.body = resp
      } else if(!ipResult) { // 密码不正确
        // 该ip增加登录次数来限制
        let [ipError, ipResult] = await to(ipM.incLoginAttepts({ip: ip, type: 'web'}))
        if (ipError) {
            resp.message = ipError || 'ip出现错误'
            ctx.body = resp
            return
        }
        if (!ipResult) { // 如果还在5词内会返回false，否则返回true
          resp.message = '您已经超过登录次数，清30分钟后再次登录'
          ctx.body = resp
          return
        }
      } else {
        resp.message = '登录成功'
        resp.code = 20000
        dbResult.password = ''

        ctx.session.userInfo = dbResult
      }
    } else {
      resp.message = '账号不存在'
    }
    ctx.body = resp

  },
  deleteWebToken: (ctx, next) => {
    let resp = {code: 20000, message: '退出成功'}
    ctx.session.userInfo = null

    ctx.body = resp
  },

}
