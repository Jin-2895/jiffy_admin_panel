import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loadable from "react-loadable";
import Header from "components/Header/Header";
import Sidebar from "react-sidebar";
import PreloadSidebar from "components/PreloadLayout/PreloadSidebar";
import { Scrollbars } from "react-custom-scrollbars";
import * as Actions from "store/actions";

const SideBarLoadable = Loadable({
  loader: () => import("components/Sidebar"),
  loading: () => <PreloadSidebar />,
});

function Layout(props) {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(
    ({ appReducer }) => appReducer.SidebarCollapse
  );

  const [windowWidth, setWindowWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const onToggleNavCollapsed = () => {
    dispatch(Actions.collapsedSidebarAction());
  };

  const renderHeader = () => {
    return <Header />;
  };
  const renderSidebar = () => {
    return <SideBarLoadable />;
  };
  const renderPage = () => {
    const { children } = props;
    return (
      <Scrollbars
        className="rct-scroll"
        autoHide
        autoHideDuration={100}
        style={{ height: "calc(100vh - 50px)" }}
      >
        <div className="rct-page-content">{children}</div>
      </Scrollbars>
    );
  };
  return (
    <div className="app-main-container">
      <Sidebar
        sidebar={renderSidebar()}
        open={windowWidth <= 1199 ? sidebarOpen : false}
        docked={windowWidth > 1199 ? !sidebarOpen : false}
        onSetOpen={() => onToggleNavCollapsed()}
        styles={{ content: { overflowY: "" } }}
        contentClassName={"app-conrainer-wrapper"}
      >
        <div className="app-container">
          <div className="rct-app-content">
            <div className="app-header">{renderHeader()}</div>
            <div className="rct-page">{renderPage()}</div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default Layout;
