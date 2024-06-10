import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import * as VueRouter from "vue-router";

import "./main.css";

import Login from "./pages/Login.vue";
// import Logout from "./pages/Logout.vue";
import Airport from "./pages/Airport.vue";
import HomePage from "./pages/HomePage.vue";
import ProductList from "./pages/ProductList.vue";
import ProductDetails from "./pages/ProductDetails.vue";
import ShoppingCart from "./pages/ShoppingCart.vue";
import Register from "./pages/Register.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRdGsXsNMVUsyswHv7reBDYgf_3GYKTNE",
  authDomain: "vue-node-mongo-shopping.firebaseapp.com",
  projectId: "vue-node-mongo-shopping",
  storageBucket: "vue-node-mongo-shopping.appspot.com",
  messagingSenderId: "228650435567",
  appId: "1:228650435567:web:ee9e8fc2fcb7a3e6ccec1a",
};

initializeApp(firebaseConfig);

// const emitter = mitt();

var router = VueRouter.createRouter({
  linkActiveClass: "border-indigo-500",
  linkExactActiveClass: "border-indigo-700",
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
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
      component: ProductList,
    },
    {
      path: "/products/:productId",
      component: ProductDetails,
    },
    {
      path: "/Login",
      component: Login,
    },
    {
      path: "/Register",
      component: Register,
    },
    // {
    //   path: "/Logout",
    //   component: Logout,
    // },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
    },
  ],
});

const myApp = createApp(App).use(router).use(store).mount("#app");
// myApp.config.globalProperties.emitter = emitter;

/* Authorization checks */
const isLoggedIn = () => {
  return localStorage.getItem("token");
};

const protectedRoutes = ["HomePage", "CartPage", "AirportPage"];

router.beforeEach((to, from, next) => {
  // console.log("to.name: ", to.name);
  const isProtected = protectedRoutes.includes(to.name);
  if (isProtected && !isLoggedIn()) {
    next({
      path: "/Login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});
/* Authorization checks */
