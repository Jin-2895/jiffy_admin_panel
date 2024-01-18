/**
 * User Block Component
 */
import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
// import { Link } from "react-router-dom";
import * as AuthActions from "auth/store/actions";
import { useDispatch, useSelector } from "react-redux";

function UserBlock() {
  const dispatch = useDispatch();
  const Auth = useSelector(({ auth }) => {
    return auth.login.success ? auth.user : false;
  });
  const [userDropdownMenu, setUserDropdownMenu] = useState(false);

  if (Auth === false) {
    return null;
  }

  const toggleUserDropdownMenu = () => {
    setUserDropdownMenu(!userDropdownMenu);
  };
  const logoutUser = () => {
    dispatch(AuthActions.logoutUser());
  };
  return (
    <div className="top-sidebar">
      <div className="sidebar-user-block">
        <Dropdown
          isOpen={userDropdownMenu}
          toggle={() => toggleUserDropdownMenu()}
          className="rct-dropdown"
        >
          <DropdownToggle
            tag="div"
            className="d-flex justify-content-center align-items-center"
          >
            <div className="user-info">
              <span className="user-name">{Auth.name}</span>
              <i className="zmdi zmdi-chevron-down dropdown-icon ml-3"></i>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <ul className="list-unstyled mb-0">
              {/* <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                <p className="text-white mb-0 fs-14">{Auth.name}</p>
              </li>
              <li>
                <Link to="/admin/profile">
                  <i className="zmdi zmdi-account text-primary mr-3"></i>
                  <span>Profile</span>
                </Link>
              </li> */}
              <li className="border-top">
                <a href="!#" onClick={() => logoutUser()}>
                  <i className="zmdi zmdi-power text-danger mr-3"></i>
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserBlock;
