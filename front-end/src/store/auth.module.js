const storeDataSession = JSON.parse(localStorage.getItem("vueAppStore"));

const authDataSession = storeDataSession?.auth;
const userObjDataSession = authDataSession?.userObj;
const statusDataSession = authDataSession?.status;
const initialState = authDataSession;
console.log("##### initialState #####: ", initialState);

// localStorage.removeItem("vueAppStore");

// const initialState = userId
//   ? { status: { loggedIn: true }, userObj }
//   : { status: { loggedIn: false }, userObj: null };

export default {
  state: initialState
    ? initialState
    : {
        userObj: null,
        status: {
          loggedIn: false,
        },
      },

  mutations: {
    initialise_store(state) {
      console.log("### initialise_store ###");

      if (localStorage.getItem("vueAppStore")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("vueAppStore")))
        );
      }
    },

    loginSuccess(state, userObj) {
      state.status.loggedIn = true;
      state.userObj = userObj;

      // console.log("loginSuccess # STORE STATE: ", state);
    },
    logoutSuccess(state) {
      state.status.loggedIn = false;
      state.userObj = null;

      // console.log("logoutSuccess # STORE STATE: ", state);
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
    getLoggedUserInfo: (state) => {
      return state.userObj;
    },
    getIsUserLoggedIn: (state) => {
      return state.status.loggedIn;
    },
  },
};
