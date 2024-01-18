import * as Actions from "../actions";
import navLinks from "components/Sidebar/NavLinks";

const initialState = {
  GLoading: false,
  SidebarCollapse: false,
  Sidebar: navLinks,
};

const appReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.TOGGLE_SIDEBAR: {
      return {
        ...state,
        SidebarCollapse: !state.SidebarCollapse,
      };
    }
    case Actions.TOGGLE_MENU: {
      if (action.payload) {
        let res = action.payload;
        let selected = state.Sidebar.find((prod) => prod.id === res);
        if (selected.open) {
          selected.open = false;
        } else {
          selected.open = true;
        }
        return {
          ...state,
          Sidebar: [...state.Sidebar],
        };
      } else return state;
    }

    default: {
      return state;
    }
  }
};
export default appReducer;
