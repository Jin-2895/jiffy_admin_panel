// async component
import {
  AsyncEcommerceDashboardComponent,
  AsyncCustomersListComponent,
  AsyncCustomerDetailComponent,
  AsyncCustomerViewComponent,
  AsyncUsersListComponent,
  AsyncAddUserComponent,
  AsyncProductList,
  AsyncAddProduct,
  AsyncAddCategoryRoute,
  AsyncEditCategoryRoute,
  AsyncCategoryRoute,
  AsyncPracticeRoute,
  AsyncOrderListRoute,
  AsyncOrderDetails,
} from "components/AsyncComponent/AsyncComponent";
// import UsersList from "routes/users/UsersList";

export default [
  {
    path: "dashboard",
    component: AsyncEcommerceDashboardComponent,
  },
  {
    path: "customerslist",
    component: AsyncCustomersListComponent,
  },
  {
    path: "view-customer/:id",
    component: AsyncCustomerViewComponent,
  },
  {
    path: "edit-customer/:id",
    component: AsyncCustomerDetailComponent,
  },
  {
    path: "usersList",
    component: AsyncUsersListComponent,
  },
  {
    path: "adduser",
    component: AsyncAddUserComponent,
  },
  {
    path: "products",
    component: AsyncProductList,
  },
  {
    path: "addproduct",
    component: AsyncAddProduct,
  },
  {
    path: "editproduct/:id",
    component: AsyncAddProduct,
  },
  {
    path: "category",
    component: AsyncCategoryRoute,
  },
  {
    path: "addcategory",
    component: AsyncAddCategoryRoute,
  },
  {
    path: "editcategory/:id",
    component: AsyncEditCategoryRoute,
  },
  {
    path: "practice",
    component: AsyncPracticeRoute,
  },
  {
    path: "orders",
    component: AsyncOrderListRoute,
  },
  {
    path: "order/:id",
    component: AsyncOrderDetails,
  },
];
