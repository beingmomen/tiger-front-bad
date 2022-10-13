const reset = () => ({
  name: null,
  color: null,
  activities: null,
});

export const state = () => ({
  module: "/belts",
  allData: [],
  totalItems: null,
  data: {
    name: null,
    color: null,
    activities: null,
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
  color(state) {
    return state.data.color;
  },
  activities(state) {
    return state.data.activities;
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
        if (res.data.data.length) {
          commit("setAllData", res.data.data);
          commit("setTotalItems", res.total);
        }
      });
  },

  async showSingleData({ commit }, payload) {
    commit("name", { key: "name", value: payload.name });
    commit("color", { key: "color", value: payload.color });
    const arr = [];
    payload.activities.forEach((el) => {
      arr.push(el._id);
    });
    commit("activities", { key: "activities", value: arr });
  },

  async addDataToDB({ state, dispatch }) {
    let data = await dispatch("handleFormData", state.data, {
      root: true,
    });
    return this.$axios.$post(state.module, data);
  },

  async updateDataInDB({ state, dispatch }, payload) {
    let data = await dispatch("handleFormData", state.data, {
      root: true,
    });
    return this.$axios.$patch(`${state.module}/${payload}`, data);
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
  color(state, val) {
    state.data[val.key] = val.value;
  },
  activities(state, val) {
    state.data[val.key] = val.value;
  },
};
