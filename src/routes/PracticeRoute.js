import React from "react";

const PracticeRoute = (props) => {
  return (
    <div>
      <div className="page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i
            style={{ cursor: "pointer" }}
            onClick={props.history.goBack}
            className="ti-angle-left"
          ></i>
          <h2 className="">Practice Route</h2>
        </div>
      </div>
      <div className="container"></div>
    </div>
  );
};

export default PracticeRoute;
