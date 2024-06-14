import Vue from "vue";
// import Router from "vue-router";
import * as VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter([
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/Register",
    component: Register,
  },
]);

export default router;
