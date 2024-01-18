import Domain from "lib/Config";
import axios from "axios";
export const ADMIN_GET_ORDERS = "ADMIN_GET_ORDERS";
export const ADMIN_ORDERS_LOADING = "ADMIN_ORDERS_LOADING";
export const ADMIN_ORDER_ERROR = "ADMIN_ORDER_ERROR";
export const CUSTOMER_DETAIL_ADMIN = "[ADMIN] CUSTOMER_DETAIL_ADMIN";
export const PROFILE_UPDATE = "[APP] PROFILE_UPDATE";
export const ADMIN_GET_ORDER_DETAILS = "ADMIN_GET_ORDER_DETAILS";
export const GET_ALL_ORDERS_STATS = "GET_ALL_ORDERS_STATS";
export const GET_ALL_ORDERS_STATS_ERROR = "GET_ALL_ORDER_STATS_ERROR";

export function getOrders(variables) {
  if (variables.page) {
    --variables.page;
  }

  const request = axios.post(`${Domain}/api/order/list`, {
    ...variables,
    limit: 15,
  });

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_GET_ORDERS,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: ADMIN_ORDER_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get Orders",
        });
      });
}

export function getOrderDetailsById(id) {
  const request = axios.get(`${Domain}/api/order/orderDetails/${id}`);

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_GET_ORDER_DETAILS,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "error response in getOrderDetailsById Actions",
          error.response
        );
        return dispatch({
          type: ADMIN_ORDER_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get order details",
        });
      });
}

export function updateOrderStatusById(id, value, setRender) {
  const request = axios.post(`${Domain}/api/order/update/${id}`, {
    status: value,
  });

  return (dispatch) =>
    request
      .then((response) => {
        if (setRender) {
          setRender((prv) => !prv);
        }
        dispatch(OrderLoading(false));
      })
      .catch((error) => {
        dispatch(OrderLoading(false));
        console.log(error);
        console.log(
          "error response in updateOrderStatusById Actions",
          error.response
        );
      });
}
export function getAllOrdersStats() {
  const config = {
    headers: {
      Authorization:
        "Bearer U2FsdGVkX18jJujJXZ5F5Qjxg+ah5p/GfHhY2kcyCE002NZOuffS35mvp5U8Tjf03dUwqBtIVSfjQfYT1wyBMYRf3XM6qq5divWTCQVUgojzZM0TTKbFbEDT9+G/2DdRQxKR05uZGeN9XfU/kGQCPGtlAQ97S+tXZRrmPXnhceT0SDoNMixT2m/5HJ2I8WozrGGHs738CdosblnQZUyG3ccXiR3kwXnmvDlAqWFv1GEW2pq2HBe77ksIgvflGaz1DLj1NAWyoxVcfMCrIFP8MatQjcnQpZ1+LIUdNjZAKhk=",
    },
  };
  const request = axios.get(`${Domain}/api/stats/all`, config);

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: GET_ALL_ORDERS_STATS,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: GET_ALL_ORDERS_STATS_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get all order stats",
        });
      });
}

export function OrderLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: ADMIN_ORDERS_LOADING,
      payload: val,
    });
  };
}
