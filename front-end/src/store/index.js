import { createStore } from "vuex";
import AuthModule from "./auth.module.js";
import UserModule from "./user.module.js";
import AirportsModule from "./airports.module.js";

export default createStore({
  modules: {
    auth: AuthModule,
    user: UserModule,
    airports: AirportsModule,
  },
});
