import { createStore } from "vuex";
import UserModule from "./user.module.js";
import AirportsModule from "./airports.module.js";

export default createStore({
  modules: {
    user: UserModule,
    airports: AirportsModule,
  },
});

// export default createStore({
//   state: {
//     counter: 0,
//     firstName: "John",
//     lastName: "Doe",
//     favorites: [],
//   },
//   mutations: {
//     decreaseCounter(state) {
//       state.counter--;
//     },
//     increaseCounter(state) {
//       state.counter++;
//     },

//     UPDATE_FAVORITES(state, payload) {
//       state.favorites = payload;
//     },
//   },
//   actions: {
//     addToFavorites(context, payload) {
//       const favorites = context.state.favorites;
//       favorites.push(payload);

//       context.commit("UPDATE_FAVORITES", payload);
//     },
//   },
//   getters: {
//     fullName: function (state) {
//       return `${state.firstName} ${state.lastName}`;
//     },
//   },
//   modules: {},
// });
