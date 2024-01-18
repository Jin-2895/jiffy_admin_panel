import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import SidebarContent from "./SidebarContent";
import UserBlock from "./UserBlock";

function Sidebar() {
  return (
    <Fragment>
      <div
        className="rct-sidebar"
        style={{ backgroundColor: "white", color: "black" }}
      >
        <div className="rct-sidebar-content ">
          <div className="site-logo">
            <Link
              to="/admin/dashboard"
              className="logo-normal mt-1 "
              style={{ width: "100%" }}
            >
              <img
                src={require("assets/img/jiffy-logo.png")}
                className="img-fluid"
                alt="site-logo"
                // width="150"
                width="200"
              />
            </Link>
          </div>
          <div className="rct-sidebar-wrap">
            <Scrollbars
              className="rct-scroll"
              autoHide
              autoHideDuration={100}
              style={{ height: "calc(100vh - 60px)" }}
            >
              <UserBlock />
              <SidebarContent />
            </Scrollbars>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Sidebar;
