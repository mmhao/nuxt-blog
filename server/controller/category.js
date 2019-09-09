let categoryM = require('../model/schema/category');
let to = require('await-to-js').default
let Joi = require('joi')


module.exports = {
  createCategory: async (ctx, next) => {
    let resp = {code: 20001, message: '参数错误', data: {}}

    let {name, router, remark, sort} = ctx.request.body

    let verifyRule = Joi.object({
      name: Joi.string().trim().required(),
      sort: Joi.required(),
      router: Joi.string().trim().required()
    })
    sort = parseInt(sort, 10)
    let verifyResult = Joi.validate({name, router, sort}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    let [dbError, dbResult] = await to(categoryM.create({name, router, remark, sort}))


    if (dbError) {
      resp.message ='新增出错'
      resp.error = dbError
      ctx.body = resp
      return
    }

    if (dbResult) {
      resp.message = '新增成功'
      resp.code = 20000
      resp.data = dbResult
    } else {
      resp.message = '新增失败'
    }
    ctx.body = resp
  },
  deleteCategory: async (ctx, next) => {
    let resp = {code: 20001, message: '参数错误', data: {}}

    let {id} = ctx.params

    let verifyRule = Joi.object({
      id: Joi.string().trim().required(),
    })


    let verifyResult = Joi.validate({id}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    let [dbError, dbResult] = await to(categoryM.update({_id: id},{$set: {deleted: true}}))


    if (dbError) {
      resp.message = '删除出错'
      resp.error = dbError
      ctx.body = resp
      return
    }

    if (dbResult) {
      resp.message = '删除成功'
      resp.code = 20000
      resp.data = dbResult
    } else {
      resp.message = '删除失败'
    }
    ctx.body = resp
  },
  updateCategory: async (ctx, next) => {
    let resp = {code: 20001, message: '参数错误', data: {}}
    let {id} = ctx.params
    let {name, router, remark, sort} = ctx.request.body
    let verifyRule = Joi.object({
      id: Joi.string().trim().required(),
      name: Joi.string().trim().required(),
      sort: Joi.required(),
      router: Joi.string().trim().required()
    })
    sort = parseInt(sort, 10)

    let verifyResult = Joi.validate({id, name, router, sort}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    let [dbError, dbResult] = await to(categoryM.update({_id: id},{$set: {name, router, remark, sort}}))


    if (dbError) {
      resp.message = '修改出错'
      resp.error = dbError
      ctx.body = resp
      return
    }

    if (dbResult) {
      resp.message = '修改成功'
      resp.code = 20000
      resp.data = dbResult
    } else {
      resp.message = '修改失败'
    }
    ctx.body = resp
  },
  getCategoryList: async (ctx, next) => {
    let resp = {
      code: 20001,
      message: '参数错误',
      data: {}
    }

    let [dbError, dbResult] = await to(categoryM.find({deleted: false}).sort({sort:1}))


    if (dbError) {
      resp.message = '查询出错'
      resp.error = dbError
      ctx.body = resp
      return
    }
    resp.message = '查询成功'
    resp.code = 20000
    resp.data.list = dbResult
    ctx.body = resp

  },
  getCategoryDetail: async (ctx, next) => {
    let resp = {code: 20001, message: '参数错误', data: {}}

    //let {id} = ctx.request.body
    let {id} = ctx.params
    let verifyRule = Joi.object({
        id: Joi.string().trim().required(),
    })


    let verifyResult = Joi.validate({id}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    let [dbError, dbResult] = await to(categoryM.findOne({deleted: false, _id: id}))


    if (dbError) {
      resp.message = '查询出错'
      resp.error = dbError
      ctx.body = resp
      return
    }

    resp.message = '查询成功'
    resp.code = 20000
    resp.data = dbResult
    if (!dbResult) {
      resp.message = '没有数据了'
    }
    ctx.body = resp
  }

}
