const reset = () => ({
  name: null,
  email: null,
  country: null,
  phone: "(000)",
  password: null,
  passwordConfirm: null,
});

export const state = () => ({
  module: "/activities",
  data: {
    name: null,
    email: null,
    country: null,
    phone: "(000)",
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
  password(state) {
    return state.data.password;
  },
  passwordConfirm(state) {
    return state.data.passwordConfirm;
  },
};

export const actions = {
  async submit({ state, dispatch }) {
    this.$axios.$post("/users/signup", state.data).then((res) => {
      if (res.status == "success") {
        this.$toast.success("يمكنك تسجيل الدخول الان");
        this.$router.push("/login");
      }
    });
  },
};

export const mutations = {
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
  phone(state, val) {
    state.data[val.key] = val.value;
  },
  password(state, val) {
    state.data[val.key] = val.value;
  },
  passwordConfirm(state, val) {
    state.data[val.key] = val.value;
  },
};
