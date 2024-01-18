// nav links
const navlinks = [
  {
    id: 1,
    menu_title: "Dashboard",
    menu_icon: "zmdi zmdi-view-dashboard",
    path: "/admin/dashboard",
    child_routes: null,
  },
  {
    id: 2,
    menu_title: "Product",
    menu_icon: "zmdi zmdi-shopping-basket",
    child_routes: [
      { path: "/admin/products", menu_title: "products list" },
      { path: "/admin/addproduct", menu_title: "add product" },
    ],
  },
  {
    id: 3,
    menu_title: "category",
    menu_icon: "zmdi zmdi-format-list-bulleted",
    child_routes: [
      { path: "/admin/category", menu_title: "category List" },
      { path: "/admin/addcategory", menu_title: "add category" },
    ],
  },
  {
    id: 4,
    menu_title: "Customers",
    menu_icon: "zmdi zmdi-accounts-alt",
    path: "/admin/customerslist",
    child_routes: null,
  },
  // {
  //   id: 6,
  //   menu_title: "Price List",
  //   menu_icon: "zmdi zmdi-card-giftcard",
  //   path: "/admin/pricelist",
  //   child_routes: null,
  // },
  // {
  //   id: 7,
  //   menu_title: "Users",
  //   menu_icon: "zmdi zmdi-account-box",
  //   child_routes: [
  //     { path: "/admin/usersList", menu_title: "Users" },
  //     { path: "/admin/adduser", menu_title: "add user" },
  //   ],
  // },
  {
    id: 8,
    menu_title: "Orders",
    menu_icon: "zmdi zmdi-account-box",
    path: "/admin/orders",
    child_routes: null,
  },
];

export default navlinks;
