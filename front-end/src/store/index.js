// import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";

import { createStore } from "vuex";
import AuthModule from "./auth.module.js";
import UserModule from "./user.module.js";
import FavoriteModule from "./favorite.module.js";
import OrderModule from "./order.module.js";

export default createStore({
  modules: {
    auth: AuthModule,
    user: UserModule,
    allItems: FavoriteModule,
    order: OrderModule,
  },
  plugins: [],
});
