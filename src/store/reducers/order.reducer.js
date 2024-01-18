import * as Actions from "../actions";
import moment from "moment";

const initialState = {
  loading: false,
  orderList: [],
  totalOrders: null,
  orderStats: [],
  orderDetail: null,
  error: null,
};

const OrderReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.ADMIN_ORDERS_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Actions.ADMIN_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    // case Actions.CUSTOMER_DETAIL_ADMIN: {
    //   return {
    //     ...state,
    //     customerDetail: action.payload,
    //     Loading: false,
    //     error: null,
    //   };
    // }
    case Actions.ADMIN_GET_ORDERS: {
      let resFormattedMapped = [];
      let rows = [];
      let totalOrders;
      if (action.payload) {
        let res = action.payload;
        totalOrders = res.count;
        resFormattedMapped = res.rows.map((ord) => ({
          id: ord.id,
          address: ord.address,
          amount: ord.amount,
          status: ord.status,
          dateOrderPlaced: moment(ord.dateOrderPlaced).format(
            "MMM DD YYYY h:mm A"
          ),
        }));

        rows = resFormattedMapped.map((order) => {
          if (order.status === "pending") {
            return {
              ...order,
              labelClass: "badge-info",
            };
          } else if (order.status === "canceled") {
            return {
              ...order,
              labelClass: "badge-danger",
            };
          } else if (order.status === "completed") {
            return {
              ...order,
              labelClass: "badge-success",
            };
          }
          return order;
        });
      }
      return {
        ...state,
        loading: false,
        error: null,
        orderList: rows,
        totalOrders,
      };
    }

    case Actions.ADMIN_GET_ORDER_DETAILS:
      return {
        ...state,
        loading: false,
        orderDetail: action.payload,
      };

    case Actions.ADMIN_GET_O:
      return {
        ...state,
        loading: false,
        orderDetail: action.payload,
      };
    case Actions.GET_ALL_ORDERS_STATS:
      return {
        ...state,
        loading: false,
        error: null,
        orderStats: action.payload,
      };
    case Actions.GET_ALL_ORDERS_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default: {
      return state;
    }
  }
};
export default OrderReducer;
