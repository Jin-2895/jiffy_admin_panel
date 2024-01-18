import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Col, Row, Button } from "reactstrap";
import ReactTable from "react-table-6";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Actions from "../../store/actions";
import history from "@history";
import "react-table-6/react-table.css";
import styles from "./OrderList.module.css";
import qs from "query-string";
import { Link } from "react-router-dom";

const OrderList = (props) => {
  const querystr = qs.parse(props.location.search);
  const dispatch = useDispatch();

  const [variables, setVariables] = useState({ ...querystr });

  const orderReducer = useSelector((state) => state.orders);
  const { orderList, loading, totalOrders } = orderReducer;

  const handlePageChange = (pg) => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    let searchKey = `${e.target.key.value}`;
    let searchVal = e.target.value.value;
    setVariables({
      ...variables,
      [searchKey]: searchVal,
      page: 1,
    });
    document.getElementById("search_input").value = "";
  };

  const onSearchClearHandler = () => {
    setVariables((prvsVariables) => {
      return {
        page: prvsVariables.page + 1,
      };
    });
  };

  useEffect(() => {
    if (orderReducer) {
      const q_str = qs.stringify(variables);
      history.push({ search: q_str });
      dispatch(Actions.OrderLoading(true));
      dispatch(Actions.getOrders(variables));
    }
  }, [dispatch, variables]);

  const columns = [
    {
      maxWidth: 75,
      Header: "No.",
      accessor: "id",
      style: { textAlign: "center" },
    },
    {
      Header: "Amount",
      accessor: "amount",
      style: { textAlign: "center" },
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: (props) => {
        return (
          <div>
            <span title={props.original.address}>{props.original.address}</span>
          </div>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      style: { textAlign: "center" },
      Cell: (props) => {
        return (
          <div className="flex">
            <div className="item-center content-center">
              <span
                className={`badge ${props.original.labelClass} block w-100`}
              >
                {props.original.status}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      Header: "Order Place Date",
      accessor: "dateOrderPlaced",
      style: { textAlign: "center" },
    },
    {
      Header: "",
      accessor: "",
      style: { textAlign: "center", margin: 0, padding: 0 },
      Cell: (props) => {
        return (
          <div className="flex">
            <Link
              to={`/admin/order/${props.original.id}`}
              className="flex item-center content-center"
            >
              <Button
                color="primary"
                size="sm"
                className="mt-1 "
                style={{ minWidth: "10rem" }}
              >
                View
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i
            style={{ cursor: "pointer" }}
            onClick={props.history.goBack}
            className="ti-angle-left"
          ></i>
          <h2 className="">Order List</h2>
        </div>
      </div>
      <div style={styless.main}>
        <div className=" d-flex justify-content-end">
          <div className={styles.flex}>
            <div>
              <form
                onSubmit={(e) => onSearchHandler(e)}
                className={styles.flex}
              >
                <div>
                  <Input type="select" name="key">
                    <option value="id">ID</option>
                    <option value="address">Address</option>
                  </Input>
                </div>
                <div className="mx-10 mb-5">
                  <Row className="justify-content-center">
                    <Col className={styles.padding_0}>
                      <Input
                        type="text"
                        name="value"
                        id="search_input"
                        placeholder="search query..."
                        required
                        style={{ width: "200px", marginLeft: "0.5rem" }}
                      />
                    </Col>
                    <Col
                      className={styles.padding_0}
                      style={{ marginLeft: "0.5rem" }}
                    >
                      <Button color="danger">Search</Button>
                    </Col>
                    <Col className={styles.padding_0}>
                      <Button
                        color="primary"
                        style={{ marginLeft: "2px" }}
                        onClick={onSearchClearHandler}
                      >
                        Clear
                      </Button>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <ReactTable
            style={{ backgroundColor: "white" }}
            className="invoices-table"
            loading={loading}
            loadingText={<CircularProgress />}
            data={orderList}
            columns={columns}
            onPageChange={(pg) => handlePageChange(pg)}
            // onSortedChange={(newSorted) => handleSorting(newSorted)}
            page={variables.page}
            manual
            pages={Math.ceil(totalOrders / 7)}
            showPageSizeOptions={false}
            showPageJump={true}
            minRows={1}
            getTdProps={(state, rowInfo, column) => ({
              style: {
                height: "40px",
              },
            })}
          />
        </div>
      </div>
    </div>
  );
};

const styless = {
  main: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "2rem",
  },
};

export default OrderList;
