/**
 * Visitor Area Chart Widget
 */
import React from "react";

// chart
import TinyAreaChart from "components/Charts/TinyAreaChart";
// helpers
import { hexToRgbA } from "helpers/helpers";

const VisitorAreaChart = ({ data }) => (
  <div className="rct-block">
    <div className="rct-block-content">
      <div className="clearfix">
        <div className="float-left">
          <h3 className="mb-15 fw-semi-bold">Visitors</h3>
          <div className="d-flex">
            <div className="mr-50">
              <span className="fs-14 d-block">Weekly</span>
              {data?.weekly}
              {/* <CountUp
                separator=","
                className="counter-point"
                start={0}
                end={}
                duration={5}
                useEasing={true}
              /> */}
            </div>
            <div className="">
              <span className="fs-14 d-block">Monthly</span>
              {data?.monthly}
              {/* <CountUp
                separator=","
                className="counter-point"
                start={0}
                end={data?.monthly}
                duration={5}
                useEasing={true}
              /> */}
            </div>
          </div>
        </div>
        <div className="float-right hidden-md-down">
          <div className="featured-section-icon">
            <i className="zmdi zmdi-globe-alt"></i>
          </div>
        </div>
      </div>
    </div>
    <TinyAreaChart
      label="Visitors"
      chartdata={data?.chartData.data}
      labels={data?.chartData.labels}
      backgroundColor={hexToRgbA("#5D92F4", 0.1)}
      borderColor={hexToRgbA("#5D92F4", 3)}
      lineTension="0"
      height={70}
      gradient
    />
  </div>
);

export default VisitorAreaChart;
