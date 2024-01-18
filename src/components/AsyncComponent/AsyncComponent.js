/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "components/RctPageLoader/RctPageLoader";
import PreloadTable from "components/PreloadLayout/PreloadTable";
// import PreloadProduct from "components/PreloadLayout/preloadProduct";

// ecommerce dashboard
const AsyncEcommerceDashboardComponent = Loadable({
  loader: () => import("routes/dashboard"),
  loading: () => <RctPageLoader />,
});
const AsyncCustomersListComponent = Loadable({
  loader: () => import("routes/customers/CustomersList"),
  loading: () => <PreloadTable />,
});
const AsyncCustomerViewComponent = Loadable({
  loader: () => import("routes/customers/ViewCustomer"),
  loading: () => <RctPageLoader />,
});
const AsyncCustomerDetailComponent = Loadable({
  loader: () => import("routes/customers/EditCustomer"),
  loading: () => <RctPageLoader />,
});
const AsyncUsersListComponent = Loadable({
  loader: () => import("routes/users/UsersListDummy"),
  loading: () => <RctPageLoader />,
});
const AsyncAddUserComponent = Loadable({
  loader: () => import("routes/users/AddUser"),
  loading: () => <RctPageLoader />,
});
const AsyncProductList = Loadable({
  loader: () => import("routes/products/ProductList"),
  loading: () => <RctPageLoader />,
});
const AsyncAddProduct = Loadable({
  loader: () => import("routes/products/AddProduct"),
  loading: () => <RctPageLoader />,
});

const AsyncCategoryRoute = Loadable({
  loader: () => import("routes/categories/Category"),
  loading: () => <RctPageLoader />,
});
const AsyncAddCategoryRoute = Loadable({
  loader: () => import("routes/categories/AddCategory"),
  loading: () => <RctPageLoader />,
});
const AsyncEditCategoryRoute = Loadable({
  loader: () => import("routes/categories/AddCategory"),
  loading: () => <RctPageLoader />,
});
const AsyncPracticeRoute = Loadable({
  loader: () => import("routes/PracticeRoute"),
  loading: () => <RctPageLoader />,
});
const AsyncOrderListRoute = Loadable({
  loader: () => import("routes/orders/OrderList"),
  loading: () => <RctPageLoader />,
});
const AsyncOrderDetails = Loadable({
  loader: () => import("routes/orders/OrderDetail"),
  loading: () => <RctPageLoader />,
});
export {
  AsyncEcommerceDashboardComponent,
  AsyncCustomersListComponent,
  AsyncCustomerViewComponent,
  AsyncCustomerDetailComponent,
  AsyncUsersListComponent,
  AsyncAddUserComponent,
  AsyncProductList,
  AsyncAddProduct,
  AsyncCategoryRoute,
  AsyncAddCategoryRoute,
  AsyncEditCategoryRoute,
  AsyncOrderListRoute,
  AsyncPracticeRoute,
  AsyncOrderDetails,
};
