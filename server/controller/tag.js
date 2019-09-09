let categoryM = require('../model/schema/category');
let to = require('await-to-js').default
let Joi = require('joi')


module.exports = {
  getTagList: async(ctx, next) => {},
  getPostList: async (ctx, next) => {
    let resp = {
      code: 20001,
      message: '参数错误',
      data: {}
    }
    // page当前页  pre_page每页数量
    let {page = 1, pre_page = 10} = ctx.query
    let {tag} = ctx.params
    tag = decodeURI(tag)

    let verifyRule = Joi.object({
      page: Joi.number().integer(),
      pre_page: Joi.number().integer().max(20),
      tag: Joi.string().trim().required(),
    })
    page *= 1
    pre_page *= 1
    let verifyResult = Joi.validate({page, pre_page, tag}, verifyRule)
    if (verifyResult.error) {
      ctx.body = resp
      return
    }

    // let dbTotal = await to(categoryM.count({deleted: false, router: {$nin: ['about', 'contact']}}))
    let [dbTotalError,dbTotalResult] = await to(categoryM.aggregate([
    {
      $match: {
        router: {$nin: ['about', 'contact']},
        deleted: false
      }
    },
    {
      $project:{router:1,name:1, cid: '$_id', _id: 0}
    },
    {
      $lookup: {
        from: 'articles',
        localField: 'cid',
        foreignField: 'category',
        as: 'articlePost'
      }
    },
    {
      $lookup: {
         from: 'chats',
         localField: 'cid',
         foreignField: 'category',
         as: 'chatPost'
      }
    },
    {
       $project:
         {
           cid: 1,
           name: 1,
           router: 1,
           post:
             {
               $cond: { if: { $anyElementTrue: '$chatPost' }, then: '$chatPost', else: '$articlePost' }
             }
         }
      },
      {
        $unwind: {
          path: '$post',
        }
      },
      {
        $match: {
          "post.deleted": false
        }
      },
      {
         $project:
           {
             cid: 1,
             name: 1,
             router: 1,
             post: 1,
             hasTag: {
               $in: [ tag, "$post.tag" ]
             }
           }
        },
        {
          $match: {
            hasTag: true
          }
        },
      {
        $count: "total"
      }
    ]))

    let [dbAgError, dbAgResult] = await to(categoryM.aggregate([
    {
      $match: {
        router: {$nin: ['about', 'contact']},
        deleted: false
      }
    },
    {
      $project:{router:1,name:1, cid: '$_id', _id: 0}
    },
    {
      $lookup: {
        from: 'articles',
        localField: 'cid',
        foreignField: 'category',
        as: 'articlePost'
      }
    },
    {
      $lookup: {
         from: 'chats',
         localField: 'cid',
         foreignField: 'category',
         as: 'chatPost'
      }
    },
    {
       $project:
         {
           cid: 1,
           name: 1,
           router: 1,
           post:
             {
               $cond: { if: { $anyElementTrue: '$chatPost' }, then: '$chatPost', else: '$articlePost' }
             }
         }
      },
      {
        $unwind: {
          path: '$post',
        }
      },
      {
        $match: {
          "post.deleted": false
        }
      },
      {
         $project:
           {
             cid: 1,
             name: 1,
             router: 1,
             post: 1,
             hasTag: {
               $in: [ tag, "$post.tag" ]
             }
           }
        },
        {
          $match: {
            hasTag: true
          }
        },
      {
        $sort: {
          "post.create_at": -1
        }
      },
      {
        $skip: (page -1)*pre_page,
      },
      {
        $limit: pre_page,
      },
    ]))


    if (dbAgError || dbTotalError) {
      resp.message = '查询出错'
      resp.error = dbAgError
      ctx.body = resp
      return
    }
    let totalObj = dbTotalResult[0] || {}
    resp.message = '查询成功'
    resp.code = 20000
    resp.data.list = dbAgResult
    resp.data.total = totalObj.total
    ctx.body = resp
  }

}
