

export const state = ()=>({
  snippet : null
})


export const getters = {
  getSnippet(state){
    return state.snippet
  }
}

export const mutations = {

  SET_SNIPPETS(state , snippet){
    state.snippet = snippet
  }
}

export const actions = {

  getSnippet({commit},snippet){
    commit("SET_SNIPPETS",snippet) ;
  }
}
