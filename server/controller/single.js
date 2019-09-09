let singleM = require('../model/schema/single');
let categoryM = require('../model/schema/category');
let to = require('await-to-js').default
let Joi = require('joi')


module.exports = {
  updateSingle: async (ctx, next) => {
    let resp = {code: 20001, message: '参数错误', data: {}}
    let {title, summary, content, tag, style} = ctx.request.body
    let verifyRule = Joi.object({
      title: Joi.string().trim().required(),
      summary: Joi.string().trim().required(),
      content: Joi.string().trim().required(),
      tag: Joi.array(),
      style: Joi.string().trim().required(),
    })


    let verifyResult = Joi.validate({title, summary, content, tag, style}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }
    let [dbCategoryError, dbCategoryResult] = await to(categoryM.findOne({router: style}))

    if (dbCategoryError) {
      resp.message ='分类查询出错'
      resp.error = dbError
      ctx.body = resp
      return
    }
    if (!dbCategoryResult) {
      resp.message = '没有该分类'
      ctx.body = resp
      return
    }

    let [dbSingleError, dbSingleResult] = await to(singleM.findOne({style: style}))

    if (dbSingleError) {
      resp.message ='查找该文章出错'
      resp.error = dbError
      ctx.body = resp
      return
    }
    let dbError, dbResult
    if (!dbSingleResult) {
      [dbError, dbResult] = await to(singleM.create({title: title, summary: summary, content: content, tag: tag, category: dbCategoryResult._id, style: style}))
    } else {
       [dbError, dbResult] = await to(singleM.update({style},{$set: {title, summary, content, tag}}))
    }



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
  getSingleDetail: async (ctx, next) => {
    let resp = {code: 20001, message: '参数错误', data: {}}

    //let {id} = ctx.request.body
    let {style} = ctx.query
    let verifyRule = Joi.object({
        style: Joi.string().trim().required(),
    })


    let verifyResult = Joi.validate({style}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    let [dbError, dbResult] = await to(singleM.findOne({deleted: false, style: style}).populate('category').exec())


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
  },

}
