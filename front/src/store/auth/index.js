import axios from "../../plugins/axios";
import { AUTH_LOGOUT, SET_USER_DATA } from "./mutations-const";

const state = {
  user: JSON.parse(localStorage.getItem("user"))
};

const getters = {
  loggedIn: state => !!state.user
};

const mutations = {
  [SET_USER_DATA]: (state, userData) => {
    state.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userData.access_token}`;
  },
  [AUTH_LOGOUT]: state => {
    state.user = null;
    localStorage.removeItem("user");
  }
};

const actions = {
  login: ({ commit }, { email, password }) => {
    return axios
      .post("auth/login", {
        email,
        password
      })
      .then(({ data }) => {
        commit(SET_USER_DATA, data);
        return data;
      });
  },

  register: ({ commit }, { name, email, password }) => {
    return axios
      .post("auth/register", {
        name,
        email,
        password
      })
      .then(({ data }) => {
        commit(SET_USER_DATA, data);
        return data;
      });
  },

  logout: ({ commit }) => {
    commit(AUTH_LOGOUT);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
