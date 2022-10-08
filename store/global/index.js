const resetData = () => ({});

export const state = () => ({
  activitiesList: [],
  championshipsList: [],
  beltsList: [],
});

export const getters = {
  activitiesList(state) {
    return state.activitiesList;
  },
  championshipsList(state) {
    return state.championshipsList;
  },
  beltsList(state) {
    return state.beltsList;
  },
};

export const actions = {
  getActivitiesFromApi({ commit }, payload) {
    commit("activitiesList", payload);
  },
  getChampionshipsFromApi({ commit }, payload) {
    commit("championshipsList", payload);
  },
  getBeltsFromApi({ commit }, payload) {
    commit("beltsList", payload);
  },
};

export const mutations = {
  activitiesList(state, val) {
    state.activitiesList = val;
  },
  championshipsList(state, val) {
    state.championshipsList = val;
  },
  beltsList(state, val) {
    state.beltsList = val;
  },
};
