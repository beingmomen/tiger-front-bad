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
  belts: [],
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
  belts(state) {
    return state.belts;
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
        } else {
          this.$toast.info("No data to show");
        }
      });
  },

  async showSingleData({ commit }, payload) {
    commit("setPreviewImage", payload.image);
    commit("name", { key: "name", value: payload.name });
    commit("startDate", {
      key: "startDate",
      value: this.$moment(payload.startDate).format("YYYY-MM-DD"),
    });
    commit("birth", {
      key: "birth",
      value: this.$moment(payload.birth).format("YYYY-MM-DD"),
    });
    commit("nationalId", { key: "nationalId", value: payload.nationalId });
    commit("lastBeltName", {
      key: "lastBeltName",
      value: payload.lastBelt.belt._id,
    });
    commit("lastBeltDate", {
      key: "lastBeltDate",
      value: this.$moment(payload.lastBelt.date).format("YYYY-MM-DD"),
    });
    commit("championships", {
      key: "championships",
      value: payload.championships,
    });
    commit("activity", { key: "activity", value: payload.activity._id });
    commit("setBelts", payload.belts);
    // commit("belts", { data: payload.belts, change: false });
    commit("belts", payload.belts);
  },

  activityChange({ commit, state, dispatch }) {
    // Reset Championship & Last Belt Name Fields
    commit("lastBeltName", { key: "lastBeltName", value: null });
    commit("championships", { key: "championships", value: null });

    // Get all Championships related to activity
    this.$axios
      .$get(`/activities/${state.data.activity}/championships`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        dispatch("global/getChampionshipsFromApi", res.data.data, {
          root: true,
        });
      });

    // Get all Belts related to activity
    this.$axios
      .$get(`/activities/${state.data.activity}/belts`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        dispatch("global/getBeltsFromApi", res.data.data, {
          root: true,
        });
      });
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

  removeBeltFromTimeLine({ state, commit }, payload) {
    let filter = state.belts.filter((el) => el._id != payload);
    commit("setBelts", filter);
    commit("belts", { data: state.belts, confirm: false });
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
  setBelts(state, val) {
    state.belts = val;
  },
  belts(state, val) {
    state.data.belts = val;
    // if (!val.change) {
    //   console.warn("val", val);
    //   let belts = JSON.parse(JSON.stringify(val));
    //   state.data.belts = belts;
    // } else {
    //   state.data.belts = val.data;
    // }
  },
  // belts(state, val) {
  //   let arr = [];
  //   val.data.forEach((el) => {
  //     arr.push({
  //       belt: el.belt._id || el.belt,
  //       date: el.date,
  //     });
  //   });
  //   if (val.confirm) {
  //     state.data.belts = [...arr, ...state.data.belts];
  //   } else {
  //     state.data.belts = arr;
  //   }
  // },
};
