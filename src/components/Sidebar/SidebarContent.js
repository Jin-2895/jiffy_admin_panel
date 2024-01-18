import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "store/actions";
import "./sidebarStyle.css";

function SidebarContent() {
  const dispatch = useDispatch();
  const sidebar = useSelector(({ appReducer }) => appReducer.Sidebar);

  const toggleMenu = (id) => {
    dispatch(Actions.toggleSidebarMenu(id));
  };
  if (sidebar === null || sidebar === undefined) {
    return null;
  }
  return (
    <div className="rct-sidebar-nav">
      <nav className="navigation">
        <List
          className="rct-mainMenu p-0 m-0 list-unstyled text-black"
          // subheader={
          //   <ListSubheader className="side-title" component="li">
          //     General
          //   </ListSubheader>
          // }
        >
          <Fragment>
            {sidebar.map((menu, key) =>
              menu.child_routes === null ? (
                <ListItem button component="li" key={key}>
                  <NavLink activeClassName="rgba-active" to={menu.path}>
                    <ListItemIcon className="menu-icon">
                      <i className={menu.menu_icon}></i>
                    </ListItemIcon>
                    <span className="menu">{menu.menu_title}</span>
                  </NavLink>
                </ListItem>
              ) : (
                <Fragment key={key}>
                  <ListItem
                    button
                    component="li"
                    onClick={() => toggleMenu(menu.id)}
                    className={`list-item ${classNames({
                      "item-active": menu.open,
                    })}`}
                  >
                    <ListItemIcon className="menu-icon">
                      <i className={menu.menu_icon}></i>
                    </ListItemIcon>
                    <span className="menu text-capitalize">
                      {menu.menu_title}
                    </span>
                  </ListItem>
                  <Collapse in={menu.open} timeout="auto" className="sub-menu">
                    <Fragment>
                      <List className="list-unstyled py-0">
                        {menu.child_routes.map((subMenu, index) => (
                          <ListItem button component="li" key={index}>
                            <NavLink
                              to={subMenu.path}
                              activeClassName="item-active"
                            >
                              <span className="menu">{subMenu.menu_title}</span>
                            </NavLink>
                          </ListItem>
                        ))}
                      </List>
                    </Fragment>
                  </Collapse>
                </Fragment>
              )
            )}
          </Fragment>
        </List>
      </nav>
    </div>
  );
}
export default SidebarContent;
