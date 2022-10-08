const reset = () => ({
  name: null,
  startDate: null,
  birth: null,
  nationalId: null,
  lastBelt: { belt: null, date: null },
  championships: null,
  activity: null,
  image: null,
  belts: [],
});

export const state = () => ({
  module: "/players",
  allData: [],
  totalItems: null,
  previewImage: null,
  data: {
    name: null,
    startDate: null,
    birth: null,
    nationalId: null,
    lastBelt: { belt: null, date: null },
    championships: null,
    activity: null,
    image: null,
    belts: [],
  },
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  getTotalItems(state) {
    return state.totalItems;
  },
  getPreviewImage(state) {
    return state.previewImage;
  },
  name(state) {
    return state.data.name;
  },
  startDate(state) {
    return state.data.startDate;
  },
  birth(state) {
    return state.data.birth;
  },
  nationalId(state) {
    return state.data.nationalId;
  },
  lastBeltName(state) {
    return state.data.lastBelt.belt;
  },
  lastBeltDate(state) {
    return state.data.lastBelt.date;
  },
  championships(state) {
    return state.data.championships;
  },
  activity(state) {
    return state.data.activity;
  },
  image(state) {
    return state.data.image;
  },
  // belts(state) {
  //   return state.data.belts;
  // },
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
    commit("setPreviewImage", payload.image);
    commit("name", { key: "name", value: payload.name });
    commit("startDate", { key: "startDate", value: payload.startDate });
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

  handleBeltsData({ commit }, payload) {
    commit("belts", { key: "belts", value: payload });
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
  setPreviewImage(state, val) {
    state.previewImage = val;
  },
  setData(state, val) {
    state.data = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  startDate(state, val) {
    state.data[val.key] = val.value;
  },
  birth(state, val) {
    state.data[val.key] = val.value;
  },
  nationalId(state, val) {
    state.data[val.key] = val.value;
  },
  lastBeltName(state, val) {
    state.data.lastBelt.belt = val.value;
  },
  lastBeltDate(state, val) {
    state.data.lastBelt.date = val.value;
  },
  championships(state, val) {
    state.data[val.key] = val.value;
  },
  activity(state, val) {
    state.data[val.key] = val.value;
  },
  image(state, val) {
    state.data[val.key] = val.value;
  },
  belts(state, val) {
    state.data.belts = val;
  },
};
