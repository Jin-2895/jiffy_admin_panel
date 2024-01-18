import * as Actions from "../actions";
import moment from "moment";

const initialState = {
  Loading: false,
  customerList: [],
  totalCustomers: null,
  customerDetail: null,
  error: null,
};

const customerReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.CUSTOMER_LOADING: {
      return {
        ...state,
        Loading: action.payload,
      };
    }
    case Actions.CUSTOMER_ERROR: {
      return {
        ...state,
        Loading: false,
        error: action.payload,
      };
    }
    case Actions.CUSTOMER_DETAIL_ADMIN: {
      return {
        ...state,
        customerDetail: action.payload,
        Loading: false,
        error: null,
      };
    }
    case Actions.ADMIN_GETCUSTOMERS: {
      let resFormattedMapped = [];
      let totalCustomers;
      if (action.payload) {
        let res = action.payload;
        totalCustomers = res.count;
        resFormattedMapped = res.rows.map((cust) => ({
          id: cust.id,
          fullName: cust.name,
          email: cust.email,
          phone: cust.phone,
          // status: cust.status,
          createdAt: moment(cust.createdAt).format("MMM DD YYYY h:mm A"),
        }));
      }
      return {
        ...state,
        Loading: false,
        error: null,
        customerList: resFormattedMapped,
        totalCustomers,
      };
    }

    default: {
      return state;
    }
  }
};
export default customerReducer;
