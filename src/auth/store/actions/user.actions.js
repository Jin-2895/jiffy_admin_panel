import jwtService from "services/jwtService";

export const SET_USER_DATA = "[USER] SET DATA";
export const REMOVE_USER_DATA = "[USER] REMOVE DATA";
export const USER_LOGGED_OUT = "[USER] LOGGED OUT";

export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      payload: user,
    });
  };
}

export function removeUserData() {
  return {
    type: REMOVE_USER_DATA,
  };
}
export function logoutUser() {
  return (dispatch, getState) => {
    jwtService.logout();
    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}
