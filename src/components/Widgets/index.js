/**
 * App Widgets
 */
import React from "react";
import Loadable from "react-loadable";
import PreloadWidget from "components/PreloadLayout/PreloadWidget";

const MyLoadingComponent = () => <PreloadWidget />;

const VisitorAreaChartWidget = Loadable({
  loader: () => import("./VisitorAreaChart"),
  loading: MyLoadingComponent,
});

const SalesAreaChartWidget = Loadable({
  loader: () => import("./SalesAreaChart"),
  loading: MyLoadingComponent,
});

const OrdersAreaChartWidget = Loadable({
  loader: () => import("./OrdersAreaChart"),
  loading: MyLoadingComponent,
});

const SupportRequest = Loadable({
  loader: () => import("./SupportRequest"),
  loading: MyLoadingComponent,
});

const RecentOrdersWidget = Loadable({
  loader: () => import("./RecentOrders"),
  loading: MyLoadingComponent,
});

export {
  VisitorAreaChartWidget,
  OrdersAreaChartWidget,
  SalesAreaChartWidget,
  SupportRequest,
  RecentOrdersWidget,
};
