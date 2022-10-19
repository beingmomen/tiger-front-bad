export const state = () => ({
  layoutCollapsed: true,
  sidebar: false,
  mode: true,
  dashDir: "ltr",
});

export const getters = {
  getLayoutCollapsed(state) {
    return state.layoutCollapsed;
  },
  getSidebar(state) {
    return state.sidebar;
  },
  getMode(state) {
    return state.mode;
  },
  getDashDir(state) {
    return state.dashDir;
  },
};

export const actions = {
  toggleLayoutCollapsed({ dispatch, commit, state }, payload) {
    if (payload > 1200) {
      commit("setLayoutCollapsed", state.layoutCollapsed ? false : true);
    } else {
      dispatch("hideSidebar");
    }
  },
  hideSidebar({ commit, state }) {
    commit("setSidebar", state.sidebar ? false : true);
  },
  layoutMode({ commit }, payload) {
    commit("setMode", payload == "light" ? true : false);
  },
  changeDashDir({ commit }, payload) {
    if (payload == "ar") {
      commit("setDashDir", "rtl");
    } else {
      commit("setDashDir", "ltr");
    }
  },
  showSuccessMsg({}, payload) {
    this.$toast.success(payload);
  },
  handleFormData({}, payload) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (value) {
        if (
          typeof value == "object" &&
          !key.includes("image") &&
          !key.includes("lastBelt") &&
          !key.includes("belts") &&
          !key.includes("photo")
        ) {
          value.forEach((el, i) => {
            formData.append(key, el);
          });
        } else if (key == "belts") {
          value.forEach((el, i) => {
            formData.append(
              `belts[${i}][belt]`,
              typeof el.belt == "object" ? el.belt._id : el.belt
            );
            formData.append(`belts[${i}][date]`, el.date);
          });
        } else if (key == "lastBelt") {
          formData.append(`lastBelt.belt`, value.belt);
          formData.append(`lastBelt.date`, value.date);
        } else {
          formData.append(key, value);
        }
      }
    }
    return formData;
  },
  handleError({}, payload) {
    let errors = [];
    for (const [key, value] of Object.entries(payload)) {
      errors.push(...value);
    }
    errors.forEach((el) => {
      this.$toast.error(el.toString());
    });
  },
};

export const mutations = {
  setLayoutCollapsed(state, val) {
    state.layoutCollapsed = val;
  },
  setSidebar(state, val) {
    state.sidebar = val;
  },
  setMode(state, val) {
    state.mode = val;
  },
  setDashDir(state, val) {
    state.dashDir = val;
  },
};
