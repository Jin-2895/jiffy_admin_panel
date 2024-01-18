import axios from "axios";
import Domain from "lib/Config";
import { NotificationManager } from "react-notifications";
export const GET_PRICES_ADMIN = "[ADMIN] GET_PRICES_ADMIN";
export const PRICES_LOADING = "[ADMIN] PRICES_LOADING";
export const PRICES_ERROR = "[ADMIN] PRICES_ERROR";
export const PRICE_CHANGE_ADMIN = "[ADMIN] PRICE_CHANGE_ADMIN";

export function getFramePricesAdmin() {
  const request = axios.get(`${Domain}/api/admin/getFramePricesAdmin`);
  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: GET_PRICES_ADMIN,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: PRICES_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get frame prices",
        });
      });
}

export function framePricesLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: PRICES_LOADING,
      payload: val,
    });
  };
}

export function changeFramePrice(data) {
  const request = axios.post(`${Domain}/api/admin/changeFramePrice`, data);
  return (dispatch) =>
    request
      .then((resp) => {
        return dispatch({
          type: PRICE_CHANGE_ADMIN,
        });
      })
      .then(() => NotificationManager.success("Updated successfully"))
      .then(() => dispatch(getFramePricesAdmin()))
      .catch((error) => {
        dispatch(framePricesLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Error! Cannot update coupon");
      });
}
