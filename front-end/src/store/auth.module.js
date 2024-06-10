const userId = JSON.parse(localStorage.getItem("userId"));
const initialState = userId
  ? { status: { loggedIn: true }, userId }
  : { status: { loggedIn: false }, userId: null };

export default {
  state: initialState,
  mutations: {
    loginSuccess(state, userId) {
      state.status.loggedIn = true;
      state.userId = userId;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.userId = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.userId = null;
    },
  },
  actions: {
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
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
  },
};
