import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import * as VueRouter from "vue-router";

import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import HomePage from "./pages/HomePage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
// import firebase from "firebase";

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

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: "/",
          component: HomePage,
        },
        {
          path: "/Login",
          component: Login,
        },
        {
          path: "/Register",
          component: Register,
        },
        {
          path: "/cart",
          component: ShoppingCartPage,
          meta: {
            authRequired: true,
          },
        },
        {
          path: "/products",
          component: ProductsPage,
        },
        {
          path: "/products/:productId",
          component: ProductDetailPage,
        },
        {
          path: "/:pathMatch(.*)*",
          component: NotFoundPage,
        },
      ],
    })
  )
  .mount("#app");
