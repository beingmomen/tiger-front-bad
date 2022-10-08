const reset = () => ({
  name: null,
  date: null,
  activity: null,
});

export const state = () => ({
  module: "/championships",
  allData: [],
  totalItems: null,
  data: {
    name: null,
    date: null,
    activity: null,
  },
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  getTotalItems(state) {
    return state.totalItems;
  },
  name(state) {
    return state.data.name;
  },
  date(state) {
    return state.data.date;
  },
  activity(state) {
    return state.data.activity;
  },
};

export const actions = {
  getAllDataFromApi({ commit }, payload) {
    commit("setAllData", payload.data.data);
    commit("setTotalItems", payload.total);
  },

  getDataByQuery({ state, commit }, payload) {
    this.$axios
      .$get(state.module, {
        params: {
          page: payload.page,
          search: payload.search,
        },
      })
      .then((res) => {
        commit("setAllData", res.data.data);
        commit("setTotalItems", res.total);
      });
  },

  async showSingleData({ commit }, payload) {
    commit("name", { key: "name", value: payload.name });
    commit("date", { key: "date", value: payload.date });
    commit("activity", { key: "activity", value: payload.activity._id });
  },

  async addDataToDB({ state }) {
    return this.$axios.$post(state.module, state.data);
  },

  async updateDataInDB({ state }, payload) {
    return this.$axios.$patch(`${state.module}/${payload}`, state.data);
  },

  deleteFromDB({ state }, payload) {
    return this.$axios.$delete(`${state.module}/${payload}`);
  },

  resetData({ commit }, payload) {
    commit("setData", reset());
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },
  setTotalItems(state, val) {
    state.totalItems = val;
  },
  setData(state, val) {
    state.data = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  date(state, val) {
    state.data[val.key] = val.value;
  },
  activity(state, val) {
    state.data[val.key] = val.value;
  },
};
