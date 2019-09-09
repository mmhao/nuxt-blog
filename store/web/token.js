const state = () => ({
  userInfo: null
})

const mutations = {
  add(state, v) {
    state.userInfo = v
  },
  remove(state, v) {
    state.userInfo = null
  },
}


const actions = {
  add: ({commit}, v) => {
    commit('add', v)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
