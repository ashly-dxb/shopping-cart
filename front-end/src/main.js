import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import * as VueRouter from "vue-router";

import "./main.css";

// import PrimeVue from "primevue/config";
// import Badge from "primevue/badge";
// import Button from "primevue/button";
// import "primevue/resources/themes/aura-light-green/theme.css";

import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import ForgotPass from "./pages/ForgotPass.vue";
import ResetPass from "./pages/ResetPass.vue";
import ChangePass from "./pages/ChangePass.vue";

import Home from "./pages/Home.vue";
// import ProductList from "./pages/ProductList.vue";
import ProductDetails from "./pages/ProductDetails.vue";
import ShoppingCart from "./pages/ShoppingCart.vue";
import Profile from "./pages/Profile.vue";
import Airport from "./pages/Airport.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

var router = VueRouter.createRouter({
  linkActiveClass: "border-indigo-500",
  linkExactActiveClass: "border-indigo-700",
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
      name: "HomePage",
    },
    {
      path: "/airports",
      component: Airport,
      name: "AirportPage",
    },
    {
      path: "/cart",
      component: ShoppingCart,
      name: "CartPage",
    },
    {
      path: "/products",
      component: () => import("./pages/ProductList.vue"),
      name: "ProductPage",
    },
    {
      path: "/products/:productId",
      component: ProductDetails,
    },
    {
      path: "/Login",
      component: Login,
      name: "LoginPage",
    },
    {
      path: "/Register",
      component: Register,
    },
    {
      path: "/ForgotPassword",
      component: ForgotPass,
    },
    {
      path: "/ResetPassword/:id/:token",
      component: ResetPass,
    },
    {
      path: "/ChangePassword",
      component: ChangePass,
    },
    {
      path: "/Profile",
      component: Profile,
      name: "ProfilePage",
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
    },
  ],
});

const myApp = createApp(App).use(router).use(store).mount("#app");

/* Authorization checks */
const isLoggedIn = () => {
  return localStorage.getItem("token");
};

const protectedRoutes = ["HomePage", "ProfilePage", "CartPage", "AirportPage"];

router.beforeEach((to, from, next) => {
  // console.log("to.name: ", to.name, to.fullPath, from);
  const isProtected = protectedRoutes.includes(to.name);
  if (isProtected && !isLoggedIn()) {
    // console.log("beforeEach 11");
    next({
      path: "/Login",
      query: { redirect: to.fullPath },
    });
  } else {
    // console.log("beforeEach 33");
    next();
  }
});
/* Authorization checks */
