export default {
  state: {
    currentOrderItems: [],
    orderData: null,
  },

  mutations: {
    setCurrOrderItems(state, orderItems) {
      state.currentOrderItems = orderItems;
      console.log("****** setCurrOrderItems # STORE STATE: ", state);
    },
    checkoutSuccess(state, orderData) {
      state.orderData = orderData;
      console.log("****** checkoutSuccess # STORE STATE: ", state);
    },
    clearOrderInfo(state) {
      state.orderData = null;
      console.log("****** clearOrderInfo # STORE STATE: ", state);
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
