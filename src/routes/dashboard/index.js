import React from "react";
import {
  OrdersAreaChartWidget,
  RecentOrdersWidget,
  SalesAreaChartWidget,
  SupportRequest,
  VisitorAreaChartWidget,
} from "components/Widgets";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";

export default function EcommerceDashboard() {
  const dispatch = useDispatch();
  const { orderStats, error } = useSelector((state) => state.orders);
  React.useEffect(() => {
    dispatch(Actions.OrderLoading(true));
    dispatch(Actions.getAllOrdersStats());
  }, []);
  const visitorData = orderStats.visitors;
  const ordersData = orderStats.ordersData;
  const salesData = orderStats.sales;

  if (error) {
    return <div className="ecom-dashboard-wrapper">{error}</div>;
  }

  return (
    <div className="ecom-dashboard-wrapper">
      <div className="page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i className="ti-angle-left"></i>
          <h2 className="">Dashboard</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4 w-xs-full">
          <VisitorAreaChartWidget data={visitorData} />
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 w-xs-full">
          <OrdersAreaChartWidget data={ordersData} />
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 w-xs-full">
          <SalesAreaChartWidget data={salesData} />
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 w-xs-full">
          <div className="rct-block overflow-hidden">
            <div className="rct-block-title">
              <h4>Order counter</h4>
            </div>
            <SupportRequest orderStats={orderStats} />
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-8 w-xs-full">
          <div className="rct-block">
            <div className="rct-block-title">
              <h4>Recent Orders</h4>
            </div>
            <RecentOrdersWidget orderStats={orderStats} />
          </div>
        </div>
      </div>
    </div>
  );
}
