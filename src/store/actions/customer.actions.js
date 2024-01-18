import Domain from "lib/Config";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import History from "@history";
export const ADMIN_GETCUSTOMERS = "[ADMIN] ADMIN_GETCUSTOMERS";
export const CUSTOMER_LOADING = "[ADMIN] CUSTOMER_LOADING";
export const CUSTOMER_ERROR = "[ADMIN] CUSTOMER_ERROR";
export const CUSTOMER_DETAIL_ADMIN = "[ADMIN] CUSTOMER_DETAIL_ADMIN";
export const PROFILE_UPDATE = "[APP] PROFILE_UPDATE";

export function getCustomers(variables) {
  if (variables.page) {
    --variables.page;
  }
  const request = axios.post(`${Domain}/api/client/view`, {
    ...variables,
    limit: 7,
  });
  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_GETCUSTOMERS,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: CUSTOMER_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get customers",
        });
      });
}
export function CustomerLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: CUSTOMER_LOADING,
      payload: val,
    });
  };
}

export function customerDetailAdmin(id) {
  const request = axios.get(`${Domain}/api/admin/customerDetailAdmin`, {
    params: { id },
  });

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: CUSTOMER_DETAIL_ADMIN,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: CUSTOMER_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get customers",
        });
      });
}

export function customerUpdateAdmin(data) {
  const request = axios.put(`${Domain}/api/admin/customerUpdateAdmin`, data);

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: PROFILE_UPDATE,
        });
      })
      .then(() => dispatch(customerDetailAdmin(data.id)))
      .then(() => {
        NotificationManager.success("Updated successfully");
        History.goBack();
      })
      .catch((error) => {
        dispatch(CustomerLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Failed to update");
      });
}
