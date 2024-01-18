/**
 * Users Area Chart Widget
 */
import React from "react";

// chart
import TinyAreaChart from "components/Charts/TinyAreaChart";

// helpers
import { hexToRgbA } from "helpers/helpers";

const UsersAreaChart = ({ data }) => (
  <div className="rct-block">
    <div className="rct-block-content">
      <div className="clearfix">
        <div className="float-left">
          <h3 className="mb-15 fw-semi-bold">Sales</h3>
          <div className="d-flex">
            <div className="mr-50">
              <span className="fs-14 d-block">Today</span>
              {data?.today}
              {/* <CountUp
                separator=","
                className="counter-point"
                start={0}
                end={data?.today}
                duration={5}
                useEasing={true}
              /> */}
            </div>
            <div className="">
              <span className="fs-14 d-block">Total revenue</span>
              {data?.totalRevenue}
              {/* <CountUp
                separator=","
                className="counter-point"
                start={0}
                end={data?.totalRevenue}
                duration={5}
                useEasing={true}
              /> */}
            </div>
          </div>
        </div>
        <div className="float-right hidden-md-down">
          <div className="featured-section-icon">
            <i className="zmdi zmdi-shopping-cart"></i>
          </div>
        </div>
      </div>
    </div>
    <TinyAreaChart
      label="Sales"
      chartdata={data?.chartData.data}
      labels={data?.chartData.labels}
      backgroundColor={hexToRgbA("#00D0BD", 0.1)}
      borderColor={hexToRgbA("#00D0BD", 3)}
      lineTension="0"
      height={70}
      gradient
    />
  </div>
);

export default UsersAreaChart;
