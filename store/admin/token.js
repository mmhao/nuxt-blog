const state = () => ({
  adminInfo: null
})

const mutations = {
  add(state, v) {
    state.adminInfo = v
  },
  remove(state, v) {
    state.adminInfo = null
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
