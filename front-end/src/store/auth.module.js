/*
const userId = JSON.parse(localStorage.getItem("userId"));

const initialState = userId
  ? { status: { loggedIn: true }, userId }
  : { status: { loggedIn: false }, userId: null };

*/

export default {
  // plugins: [createPersistedState({ storage: window.localStorage })],
  // plugins: [vuexLocal.plugin], // experimental
  state: {
    userObj: null,
    status: {
      loggedIn: false,
    },
  },

  mutations: {
    loginSuccess(state, userObj) {
      state.status.loggedIn = true;
      state.userObj = userObj;

      console.log("loginSuccess # STORE STATE: ", state);
    },
    logoutSuccess(state) {
      state.status.loggedIn = false;
      state.userObj = null;

      console.log("logoutSuccess # STORE STATE: ", state);
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.userObj = null;
    },
  },

  actions: {
    loginDone(context, payload) {
      // const userObj = context.state.userObj;
      context.commit("loginSuccess", payload);
    },
    logoutDone(context) {
      context.commit("logoutSuccess");
    },
    /*
    login({ commit }, userId) {
      return AuthService.login(userId).then(
        (userId) => {
          commit("loginSuccess", userId);
          // commit('loginSuccess');

          return Promise.resolve(userId);
        },
        (error) => {
          commit("loginFailure");

          return Promise.reject(error);
        }
      );
    },
    */
  },
  getters: {
    loggedUserInfo: (state) => {
      return state.userObj;
    },
  },
};
