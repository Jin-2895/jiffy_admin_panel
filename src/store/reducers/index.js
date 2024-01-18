import { combineReducers } from "redux";
import auth from "../../auth/store/reducers";
import admin from "./admin.reducer";
import appReducer from "./app.reducer";
import customers from "./customer.reducer";
import products from "./product.reducer";
import orders from "./order.reducer";
// import users from "./user.reducer";
import dashboard from "./dashboard.reducer";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    appReducer,
    admin,
    customers,
    products,
    orders,
    dashboard,
    // users,
    ...asyncReducers,
  });

export default createReducer;
