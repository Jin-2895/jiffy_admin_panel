import axios from "axios";
import Domain from "../../lib/Config";

export const GET_ORDER_CHART_DATA = "GET_ORDER_CHART_DATA";
export const ORDER_CHART_DATA_FAIL = "ORDER_CHART_DATA_FAIL";
export const DASHBOARD_LOADING = "DASHBOARD_LOADING";
export const GET_RECENT_ORDERS = "GET_RECENT_ORDERS";
export const RECENT_ORDERS_FAIL = "RECENT_ORDERS_FAIL";
export const GET_ORDER_STATUS = "GET_ORDER_STATUS";
export const GET_VISITOR_STATUS = "GET_VISITOR_STATUS";
export const GET_SALES_STATUS = "GET_SALES_STATUS";

export const getOrdersChartData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${Domain}/api/stats/all`);
    dispatch({
      type: GET_ORDER_CHART_DATA,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CHART_DATA_FAIL,
      payload: error.response,
    });
  }
};

export const getRecentOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${Domain}/api/stats/all`);
    dispatch({
      type: GET_RECENT_ORDERS,
      payload: data.result.recentOrders,
    });
  } catch (error) {
    dispatch({
      type: RECENT_ORDERS_FAIL,
      payload: error.response,
    });
  }
};

export const getOrderStatus = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${Domain}/api/stats/all`);
    dispatch({
      type: GET_ORDER_STATUS,
      payload: data.result.orderStatus,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CHART_DATA_FAIL,
      payload: error.response,
    });
  }
};

export const getVisitStatus = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${Domain}/api/stats/all`);
    dispatch({
      type: GET_SALES_STATUS,
      payload: data.result.sales,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CHART_DATA_FAIL,
      payload: error.response,
    });
  }
};

export const getSales = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${Domain}/api/stats/all`);
    dispatch({
      type: GET_VISITOR_STATUS,
      payload: data.result.visitors,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CHART_DATA_FAIL,
      payload: error.response,
    });
  }
};

export const dashboardLoading = (val) => async (dispatch) => {
  try {
    dispatch({
      type: DASHBOARD_LOADING,
      payload: val,
    });
  } catch (error) {
  }
};
