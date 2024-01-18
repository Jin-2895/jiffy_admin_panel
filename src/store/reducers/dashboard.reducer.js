import * as Actions from "../actions";

const initialState = {
  loading: false,
  orders_chart: {},
  recent_orders: {},
  sales_status: null,
  order_status: null,
  visitor_status: null,
  totalOrders: null,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ORDER_CHART_DATA:
      return {
        ...state,
        orders_chart: action.payload.ordersData,
        totalOrders: action.payload.totalOrders,
        loading: false,
      };

    case Actions.ORDER_CHART_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case Actions.DASHBOARD_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case Actions.GET_RECENT_ORDERS:
      return {
        ...state,
        recent_orders: action.payload,
        loading: false,
      };

    case Actions.RECENT_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case Actions.GET_ORDER_STATUS:
      return {
        ...state,
        order_status: action.payload,
        loading: false,
      };

    case Actions.GET_VISITOR_STATUS:
      return {
        ...state,
        visitor_status: action.payload,
        loading: false,
      };

    case Actions.GET_SALES_STATUS:
      return {
        ...state,
        sales_status: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
