export const state = () => ({
  allData: [],
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
};

export const actions = {
  getAllDataFromApi({ commit, state }, payload) {
    commit("setAllData", payload);
  },
  deleteFromDB({ dispatch }, payload) {
    return this.$axios.$delete(`/users/${payload}`);
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },
};
