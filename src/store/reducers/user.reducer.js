import * as Actions from "../actions";
import moment from "moment";

const initialState = {
  loading: false,
  userList: null,
  totalUsers: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADMIN_USERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case Actions.ADMIN_GET_USERS:
      let resFormattedMapped = [];
      let totalUsers;
      if (action.payload) {
        let res = action.payload;
        totalUsers = res.length;
        resFormattedMapped = res.map((user) => ({
          id: user._id,
          fullName: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: moment(user.createdAt).format("MMM DD YYYY h:mm A"),
        }));
      }

      return {
        ...state,
        loading: false,
        error: null,
        userList: resFormattedMapped,
        totalUsers,
      };
    default:
      return state;
  }
};

export default userReducer;
