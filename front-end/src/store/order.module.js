export default {
  // plugins: [createPersistedState({ storage: window.localStorage })],
  // plugins: [vuexLocal.plugin], // experimental
  state: {
    orderData: null,
  },

  mutations: {
    checkoutSuccess(state, orderData) {
      state.orderData = orderData;
      console.log("In checkoutSuccess # STORE STATE: ", state);
    },
    clearOrderInfo(state) {
      state.orderData = null;
      console.log("In clearOrderInfo # STORE STATE: ", state);
    },
  },

  actions: {
    checkoutComplete(context, payload) {
      context.commit("checkoutSuccess", payload);
    },
    checkoutStart(context) {
      context.commit("clearOrderInfo");
    },
  },

  getters: {
    lastOrderInfo: (state) => {
      return state.orderData;
    },
  },
};
