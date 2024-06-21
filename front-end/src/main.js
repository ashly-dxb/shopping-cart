import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import * as VueRouter from "vue-router";

import "./main.css";

// import PrimeVue from "primevue/config";
// import Badge from "primevue/badge";
// import Button from "primevue/button";
// import "primevue/resources/themes/aura-light-green/theme.css";

import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import ForgotPass from "./pages/ForgotPass.vue";
import ResetPass from "./pages/ResetPass.vue";
import ChangePass from "./pages/ChangePass.vue";

import Home from "./pages/Home.vue";
// import ProductList from "./pages/ProductList.vue";
import ProductDetails from "./pages/ProductDetails.vue";
import ShoppingCart from "./pages/ShoppingCart.vue";
import StripeCheckout from "./pages/StripeCheckout.vue";

import Checkout from "./pages/Checkout.vue";
import CheckoutSuccess from "./pages/CheckoutSuccess.vue";
import CheckoutCancel from "./pages/CheckoutCancel.vue";

import MyOrders from "./pages/MyOrders.vue";
import Profile from "./pages/Profile.vue";
import Favorite from "./pages/Favorite.vue";
import Theme from "./pages/Theme.vue";
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
      path: "/favorites",
      component: Favorite,
      name: "FavoritePage",
    },
    {
      path: "/cart",
      component: ShoppingCart,
      name: "CartPage",
    },
    {
      path: "/orders",
      component: MyOrders,
      name: "OrdersPage",
    },
    {
      path: "/stripe-checkout",
      component: StripeCheckout,
      name: "StripeCheckoutPage",
    },
    {
      path: "/checkout",
      component: Checkout,
      name: "CheckoutPage",
    },
    {
      path: "/checkout-success",
      component: CheckoutSuccess,
      name: "CheckoutSuccessPage",
    },
    {
      path: "/checkout-cancel",
      component: CheckoutCancel,
      name: "CheckoutCancelPage",
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
      name: "ChangePassPage",
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
    {
      path: "/mytheme",
      component: Theme,
      name: "ThemePage",
    },
  ],
});

const myApp = createApp(App)
  .use(router)
  .use(store)
  .use(LoadingPlugin)
  .mount("#app");

/* ##################################### Authorization checks##################################### */
/* ##### The isLoggedIn check is currently based on the 'userId' in localStorage  */
/* ##### This can be changed to cookie validation or any other validations also */
const isLoggedIn = () => {
  // return localStorage.getItem("userId");
  return store.getters.getIsUserLoggedIn;
};

const protectedRoutes = [
  "HomePage",
  "CartPage",
  "OrdersPage",
  "FavoritePage",
  "ProfilePage",
  "ChangePassPage",
];

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
/* ##################################### Authorization checks##################################### */
