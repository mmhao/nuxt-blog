const {categoryList} = require('interface/category')
import test from './modules/test'
import admin from './admin/index.js'

// Vue.use(Vuex)

export const state = () => {
  return {
    //cookie: '',
    categoryList: []
  }
}

export const mutations = {
  categoryList (state, v) {
    state.categoryList = v
  },
  // addCookie (state, v) {
  //   state.cookie = v
  // },
  // removeCookie (state, v) {
  //   state.cookie = ''
  // }
}

export const actions = {
  async nuxtServerInit({ commit , dispatch}, context) {
    let ctx = context.req.ctx
    if (context.req.headers.cookie) {
      //commit('addCookie', context.req.headers.cookie)
    }

    if (ctx.session.adminInfo) {
      commit('admin/token/add', ctx.session.adminInfo)
    }
    if (ctx.session.userInfo) {
      commit('web/token/add', ctx.session.userInfo)
    }
    await dispatch('categoryList', ctx)

  },
  async categoryList (context, ctx) {
    let opts = {}
    opts = process.server ? {headers: {cookie: ctx.req.headers.cookie}} : {}

    try {
      let resp = await categoryList(opts)
      let reapData = resp.data
      let data = reapData.data || {}
      let list = data.list || []
      context.commit('categoryList', list)

    } catch (e) {
      throw new Error('action categoryList 请求出错', e)
    }
  },
}

export const modules = {
  test,
  admin
}
// const store = () => new Vuex.Store({
//   modules: {
//     test,
//     admin
//   },
//   actions: {

//   }
// })
//
// export default store
