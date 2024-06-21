import { createStore } from "vuex";
import AuthModule from "./auth.module.js";
import UserModule from "./user.module.js";
import FavoriteModule from "./favorite.module.js";
import OrderModule from "./order.module.js";

// import createPersistedState from "vuex-persistedstate";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "vueAppStore",
  storage: window.localStorage,
});

export default createStore({
  modules: {
    auth: AuthModule,
    user: UserModule,
    allItems: FavoriteModule,
    order: OrderModule,
  },
  // plugins: [createPersistedState({ key: "vueAppStore2", storage: window.localStorage })],
  // plugins: [createPersistedState()],
  plugins: [vuexPersist.plugin],
});
