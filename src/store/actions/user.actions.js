import Domain from "lib/Config";
import axios from "axios";
export const ADMIN_GET_USERS = "[ADMIN] GET_USERS";
export const ADMIN_USERS_ERROR = "[ADMIN] USERS_ERROR";
export const ADMIN_USERS_LOADING = "[ADMIN] USERS_LOADING";

export function adminGetUsers() {
  const config = {
    headers: {
      Authorization:
        "Bearer U2FsdGVkX18jJujJXZ5F5Qjxg+ah5p/GfHhY2kcyCE002NZOuffS35mvp5U8Tjf03dUwqBtIVSfjQfYT1wyBMYRf3XM6qq5divWTCQVUgojzZM0TTKbFbEDT9+G/2DdRQxKR05uZGeN9XfU/kGQCPGtlAQ97S+tXZRrmPXnhceT0SDoNMixT2m/5HJ2I8WozrGGHs738CdosblnQZUyG3ccXiR3kwXnmvDlAqWFv1GEW2pq2HBe77ksIgvflGaz1DLj1NAWyoxVcfMCrIFP8MatQjcnQpZ1+LIUdNjZAKhk=",
    },
  };
  const request = axios.get(`${Domain}/api/users`, config);

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_GET_USERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: ADMIN_USERS_ERROR,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
}

export function adminUsersLoading(value) {
  return (dispatch) => {
    return dispatch({
      type: ADMIN_USERS_LOADING,
      payload: value,
    });
  };
}
