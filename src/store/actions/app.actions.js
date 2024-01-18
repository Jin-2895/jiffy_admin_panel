export const TOGGLE_SIDEBAR = "[ADMIN] TOGGLE_SIDEBAR";
export const TOGGLE_MENU = "[ADMIN] TOGGLE_MENU";

export function toggleSidebarMenu(val) {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_MENU,
      payload: val,
    });
  };
}

export function collapsedSidebarAction() {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_SIDEBAR,
    });
  };
}
