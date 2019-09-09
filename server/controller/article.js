let articleM = require('../model/schema/article');
let categoryM = require('../model/schema/category');
let to = require('await-to-js').default
let Joi = require('joi')


module.exports = {
  createArticle: async (ctx, next) => {
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

    let [dbError, dbResult] = await to(articleM.create({title: title, summary: summary, content: content, tag: tag, category: dbCategoryResult._id, style: style}))


    if (dbError) {
      resp.message ='新增出错'
      resp.error = dbError
      ctx.body = resp
      return
    }
    if (!dbResult) {
      resp.message = '新增失败'
      ctx.body = resp
      return
    }
    dbCategoryResult.article.addToSet(dbResult._id)
    // let [cError, cResult] = await to(categoryM.update({_id:category },{'$addToSet': {category: dbResult._id}}))
    let [cError, cResult] = await to(dbCategoryResult.save())

    if (cError) {
      await to(articleM.remove({_id: dbResult._id}))

      resp.message ='新增出错'
      resp.error = cError
      ctx.body = resp
      return
    }


    if (cResult) {
      resp.message = '新增成功'
      resp.code = 20000
      resp.data = dbResult
    } else {
      await to(articleM.remove({_id: dbResult._id}))
      resp.message = '新增失败'
    }
    ctx.body = resp
  },
  deleteArticle: async (ctx, next) => {
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

    let [dbError, dbResult] = await to(articleM.update({_id: id},{$set: {deleted: true}}))


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
  updateArticle: async (ctx, next) => {
    let resp = {code: 20001, message: '参数错误', data: {}}
    let {id} = ctx.params
    let {title, summary, content, tag} = ctx.request.body
    let verifyRule = Joi.object({
      id: Joi.string().trim().required(),
      title: Joi.string().trim().required(),
      summary: Joi.string().trim().required(),
      content: Joi.string().trim().required(),
      tag: Joi.array(),
    })


    let verifyResult = Joi.validate({id, title, summary, content, tag}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    let [dbError, dbResult] = await to(articleM.update({_id: id},{$set: {title, summary, content, tag}}))


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
  getArticleList: async (ctx, next) => {
    let resp = {
      code: 20001,
      message: '参数错误',
      data: {}
    }
    // page当前页  pre_page每页数量
    let {page = 1, pre_page = 10, style} = ctx.query

    let verifyRule = Joi.object({
      page: Joi.number().integer(),
      pre_page: Joi.number().integer().max(20)
    })
    page *= 1
    pre_page *= 1
    let verifyResult = Joi.validate({page, pre_page}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    //let dbTotal = await to(articleM.count({deleted: false}).skip((page-1) * pre_page).limit(pre_page))
    let dbTotal = await to(articleM.count({deleted: false, style: style}))
    let [dbError, dbResult] = await to(articleM.find({deleted: false, style: style}).skip((page-1) * pre_page).limit(pre_page).populate('category').exec())


    if (dbError) {
      resp.message = '查询出错'
      resp.error = dbError
      ctx.body = resp
      return
    }
    resp.message = '查询成功'
    resp.code = 20000
    resp.data.list = dbResult
    resp.data.total = dbTotal[1]
    ctx.body = resp

  },
  getArticleDetail: async (ctx, next) => {
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

    let [dbError, dbResult] = await to(articleM.findOne({deleted: false, _id: id}).populate('category').exec())


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
