export default {
  state: {
    firstName: "John",
    lastName: "Doe",
  },
  getters: {
    fullName: function (state) {
      return `${state.firstName} ${state.lastName}`;
    },
  },
};
