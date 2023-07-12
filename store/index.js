export const state = () => ({
    url: ""
  })
  
  // contains your actions
  export const actions = {
    validar({ state, commit }){
      commit('setValidar', state.autentica = true)
    },
    invalidar({ state, commit }){
        commit('setInvalidar', state.autentica = false)
    },
  }
  // contains your mutations
  export const mutations = {
    setValidar(state, value){
      state.autentica = value
    },
    setInvalidar(state, value){
        state.autentica = value
      },
  }
  // your root getters
  export const getters = {
      getSituacao(state){ return state.autentica}
  }