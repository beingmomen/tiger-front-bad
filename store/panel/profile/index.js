const reset = () => ({
  name: null,
  email: null,
  country: null,
  phone: null,
});

const secret = () => ({
  passwordCurrent: null,
  password: null,
  passwordConfirm: null,
});

export const state = () => ({
  module: "/activities",
  data: {
    name: null,
    email: null,
    country: null,
    phone: null,
  },
  secret: {
    passwordCurrent: null,
    password: null,
    passwordConfirm: null,
  },
});

export const getters = {
  name(state) {
    return state.data.name;
  },
  email(state) {
    return state.data.email;
  },
  country(state) {
    return state.data.country;
  },
  phone(state) {
    return state.data.phone;
  },
  passwordCurrent(state) {
    return state.secret.passwordCurrent;
  },
  password(state) {
    return state.secret.password;
  },
  passwordConfirm(state) {
    return state.secret.passwordConfirm;
  },
};

export const actions = {
  getAllDataFromApi({ commit, dispatch }, payload) {
    commit("name", { key: "name", value: payload.name });
    commit("email", { key: "email", value: payload.email });
    commit("currentCountry", { key: "country", value: payload.country });
    commit("phone", { key: "phone", value: payload.phone });
  },
  async me({ state, dispatch }, payload) {
    this.$axios.$get("/users/me").then((res) => {
      this.$auth.setUser(res.data.data);
    });
  },
  async updateMe({ state, dispatch }, payload) {
    let data = await dispatch("handleFormData", payload || state.data, {
      root: true,
    });
    return this.$axios.$patch("/users/updateMe", data);
  },
  async updatePass({ state, dispatch }, payload) {
    return this.$axios.$patch("/users/updateMyPassword", state.secret);
  },
  resetSecret({ commit, dispatch }, payload) {
    commit("setSecret", secret());
  },
};

export const mutations = {
  setSecret(state, val) {
    state.secret = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  email(state, val) {
    state.data[val.key] = val.value;
  },
  country(state, val) {
    state.data[val.key] = val.value.name;
    state.data.phone = `(${val.value.dialCode})`;
  },
  currentCountry(state, val) {
    state.data[val.key] = val.value;
  },
  phone(state, val) {
    state.data[val.key] = val.value;
  },
  passwordCurrent(state, val) {
    state.secret[val.key] = val.value;
  },
  password(state, val) {
    state.secret[val.key] = val.value;
  },
  passwordConfirm(state, val) {
    state.secret[val.key] = val.value;
  },
};
