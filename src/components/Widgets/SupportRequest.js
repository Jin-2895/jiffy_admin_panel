/**
 * Support Request
 */
import React from "react";
import { Badge } from "reactstrap";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DoughnutChart from "components/Charts/DoughnutChart";

function SupportRequest({ orderStats }) {
  return (
    <div className="support-widget-wrap">
      <div className="text-center py-10">
        <DoughnutChart orderStats={orderStats} />
      </div>
      <List className="list-unstyled p-0">
        <ListItem className="px-15 py-0 d-flex justify-content-between align-content-center">
          <p className="mb-0 content-title">Recent</p>
          <Badge color="warning" className="px-4">
            {orderStats?.recentOrders?.length}
          </Badge>
          <IconButton color="default">
            <i className="ti-eye"></i>
          </IconButton>
        </ListItem>
        <ListItem className="bg-light px-15 py-0 d-flex justify-content-between align-content-center">
          <p className="mb-0 content-title">Pending</p>
          <Badge color="info" className="px-4">
            {orderStats?.orderStatus?.data[2]}
          </Badge>
          <IconButton color="default">
            <i className="ti-eye"></i>
          </IconButton>
        </ListItem>
        <ListItem className="px-15 py-0 d-flex justify-content-between align-content-center">
          <p className="mb-0 content-title">Cancel</p>
          <Badge color="danger" className="px-4">
            {orderStats?.orderStatus?.data[0]}
          </Badge>
          <IconButton color="default">
            <i className="ti-eye"></i>
          </IconButton>
        </ListItem>
        <ListItem className="bg-light px-15 py-0 d-flex justify-content-between align-content-center">
          <p className="mb-0 content-title">Completed</p>
          <Badge color="primary " className="px-4">
            {orderStats?.orderStatus?.data[1]}
          </Badge>
          <IconButton color="default">
            <i className="ti-eye"></i>
          </IconButton>
        </ListItem>
      </List>
      <div className="rct-block-footer d-flex justify-content-between border-0 align-items-center">
        <p className="fs-12 mb-0 text-base">
          <span>
            <i className="mr-5 zmdi zmdi-refresh"></i>
          </span>
          Updated 10 Min ago
        </p>
        <Button
          variant="contained"
          color="primary"
          className="btn-xs text-white"
        >
          Assign now
        </Button>
      </div>
    </div>
  );
}

export default SupportRequest;
