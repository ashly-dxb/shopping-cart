export default {
  // plugins: [createPersistedState({ storage: window.localStorage })],
  // plugins: [vuexLocal.plugin], // experimental
  state: {
    currentOrderItems: [],
    orderData: null,
  },

  mutations: {
    setCurrOrderItems(state, orderItems) {
      state.currentOrderItems = orderItems;
      console.log("In setCurrOrderItems # STORE STATE: ", state);
    },
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
    storeCurrOrderItems(context, payload) {
      context.commit("setCurrOrderItems", payload);
    },
    checkoutComplete(context, payload) {
      context.commit("checkoutSuccess", payload);
    },
    checkoutStart(context) {
      context.commit("clearOrderInfo");
    },
  },

  getters: {
    getCurrOrderItems: (state) => {
      return state.currentOrderItems;
    },
    getLastOrderInfo: (state) => {
      return state.orderData;
    },
  },
};
