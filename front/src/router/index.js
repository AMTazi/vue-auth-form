/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Auth from "../views/auth/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Auth,
    children: [
      {
        path: "/",
        name: "signup",
        meta: { guestOnly: true, title: "Sign Up" },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "signup" */ "../views/auth/SignUp.vue")
      },
      {
        path: "/signin",
        name: "signin",
        meta: { guestOnly: true, title: "Sign In" },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "signin" */ "../views/auth/SignIn.vue")
      }
    ]
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      requiresAuth: true,
      title: "Dashboard"
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  }
];

const router = new VueRouter({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  authorize(to, next);
  setTitle(to);
});

const authorize = (to, next) => {
  const loggedIn = store.getters["auth/loggedIn"];

  if (to.meta.hasOwnProperty("requiresAuth") && to.meta.requiresAuth) {
    !loggedIn ? next({ name: "signin" }) : next();
  } else if (to.meta.hasOwnProperty("guestOnly") && to.meta.guestOnly) {
    loggedIn ? next({ name: "dashboard" }) : next();
  } else {
    next();
  }
};

const setTitle = to => {
  document.title = `${
    to.meta.hasOwnProperty("title") ? to.meta.title + " | " : ""
  } AMT`;
};
export default router;
