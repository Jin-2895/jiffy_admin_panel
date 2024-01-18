/**
 * App Header
 */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import MenuIcon from "@material-ui/icons/Menu";
import screenfull from "screenfull";
import { useDispatch } from "react-redux";
import * as Actions from "store/actions";

function Header() {
  const dispatch = useDispatch();
  // function to change the state of collapsed sidebar
  const onToggleNavCollapsed = () => {
    dispatch(Actions.collapsedSidebarAction());
  };
  const toggleScreenFull = () => {
    screenfull.toggle();
  };

  return (
    <AppBar position="static" className="rct-header">
      <Toolbar className="d-flex justify-content-between w-100 pl-0">
        <div className="d-inline-flex align-items-center">
          <ul className="list-inline mb-0 navbar-left d-flex align-items-center">
            <li
              className="list-inline-item"
              onClick={(e) => onToggleNavCollapsed(e)}
            >
              <Tooltip title="Sidebar Toggle" placement="bottom">
                <IconButton
                  color="inherit"
                  mini="true"
                  aria-label="Menu"
                  className="humburger p-0"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </li>
            <li className="list-inline-item">
              <h2 className="text-dark ml-2 mb-0">Jiffy's</h2>
            </li>
          </ul>
        </div>
        <ul className="navbar-right list-inline mb-0">
          <li className="list-inline-item">
            <Tooltip title="Full Screen" placement="bottom">
              <IconButton
                aria-label="settings"
                onClick={() => toggleScreenFull()}
              >
                <i className="zmdi zmdi-crop-free"></i>
              </IconButton>
            </Tooltip>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
