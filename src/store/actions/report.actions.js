import axios from "axios";
import Domain from "lib/Config";
export const ORDERS_COUNT_GRAPH = "[ADMIN] ORDERS_COUNT_GRAPH";
export const LOADING_COUNT_GRAPH = "[ADMIN] LOADING_COUNT_GRAPH";
export const ORDERS_COUNT_ERROR = "[ADMIN] ORDERS_COUNT_ERROR";

export const ORDERS_PIE_GRAPH = "[ADMIN] ORDERS_PIE_GRAPH";
export const LOADING_PIE_GRAPH = "[ADMIN] LOADING_PIE_GRAPH";
export const ORDERS_PIE_ERROR = "[ADMIN] ORDERS_PIE_ERROR";

export function orderCountGraph() {
  const request = axios.get(`${Domain}/api/admin/orderCountGraph`);
  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ORDERS_COUNT_GRAPH,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: ORDERS_COUNT_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get graph detail",
        });
      });
}

export function loadingCountGraph(val) {
  return (dispatch) => {
    return dispatch({
      type: LOADING_COUNT_GRAPH,
      payload: val,
    });
  };
}

export function orderPieGraph() {
  const request = axios.get(`${Domain}/api/admin/orderPieGraph`);
  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ORDERS_PIE_GRAPH,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: ORDERS_PIE_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get graph detail",
        });
      });
}

export function loadingPieGraph(val) {
  return (dispatch) => {
    return dispatch({
      type: LOADING_PIE_GRAPH,
      payload: val,
    });
  };
}
