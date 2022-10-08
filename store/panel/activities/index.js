const reset = () => ({
  name: null,
  image: null,
  imageCover: null,
});

export const state = () => ({
  module: "/activities",
  allData: [],
  totalItems: null,
  previewImage: null,
  previewImageCover: null,
  data: {
    name: null,
    image: null,
    imageCover: null,
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
  getPreviewImageCover(state) {
    return state.previewImageCover;
  },
  name(state) {
    return state.data.name;
  },
  image(state) {
    return state.data.image;
  },
  imageCover(state) {
    return state.data.imageCover;
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
    commit("setPreviewImage", payload.image);
    commit("setPreviewImageCover", payload.imageCover);
    // let drop = await ["image", "imageCover"];
    // await drop.forEach((el) => delete payload[el]);
    // commit("setData", payload);
    commit("name", { key: "name", value: payload.name });
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
  setPreviewImage(state, val) {
    state.previewImage = val;
  },
  setPreviewImageCover(state, val) {
    state.previewImageCover = val;
  },
  setData(state, val) {
    state.data = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  image(state, val) {
    state.data[val.key] = val.value;
  },
  imageCover(state, val) {
    state.data[val.key] = val.value;
  },
};
