const mainLinks = [
  {
    link: "/",
    text: "Home",
    type: "LOGGED_IN",
    icon: "pi-home",
  },
  {
    link: "/products",
    text: "Poducts",
    type: "LOGGED_IN",
    icon: "pi-shopping-bag",
  },
  {
    link: "/cart",
    text: "My Cart",
    type: "LOGGED_IN",
    icon: "pi-shopping-cart",
  },
  {
    link: "/airports",
    text: "Airports",
    type: "LOGGED_IN",
    icon: "pi-bell",
  },
  {
    link: "/profile",
    text: "Profile",
    type: "LOGGED_IN",
    icon: "pi-user",
  },
];

const otherLinks = [
  {
    link: "/Register",
    text: "Sign-up",
    type: "NOT_LOGGED_IN",
    icon: "pi-bars",
  },
  {
    link: "/Login",
    text: "Login",
    type: "NOT_LOGGED_IN",
    icon: "pi-sign-in",
  },
];

export default mainLinks;
export { otherLinks };
