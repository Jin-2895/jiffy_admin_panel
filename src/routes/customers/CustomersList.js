import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Col, Row, Button } from "reactstrap";
import ReactTable from "react-table-6";
import CircularProgress from "@material-ui/core/CircularProgress";
// import IconButton from "@material-ui/core/IconButton";
// import VisibilityIcon from "@material-ui/icons/Visibility";
// import ListIcon from "@material-ui/icons/List";
// import DatePicker from "components/DatePicker/DatePicker";
import * as Actions from "../../store/actions";
import history from "@history";
import "react-table-6/react-table.css";
// import "./tagStyles.css";
import styles from "./CustomersList.module.css";
import qs from "query-string";
// import moment from "moment";

const CustomersList = (props) => {
  const querystr = qs.parse(props.location.search);
  // const cus_page = querystr.cus_page ? JSON.parse(querystr.page) : 1;
  const dispatch = useDispatch();

  const [variables, setVariables] = useState({ ...querystr });

  const customersReducer = useSelector((state) => state.customers);
  const { customerList, loading, totalCustomers } = customersReducer;

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
    if (CustomersList) {
      const q_str = qs.stringify(variables);
      history.push({ search: q_str });
      dispatch(Actions.CustomerLoading(true));
      dispatch(Actions.getCustomers(variables));
    }
  }, [dispatch, variables]);

  const columns = [
    {
      maxWidth: 75,
      Header: "No.",
      accessor: "id",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      Header: "Name",
      accessor: "fullName",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      Header: "Email",
      accessor: "email",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      Header: "Phone",
      accessor: "phone",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      style: { textAlign: "center", backgroundColor: "white" },
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
          <h2 className="">Customers List</h2>
        </div>
      </div>
      <div className="container" style={styless.main}>
        <div>
          <div className="d-flex justify-content-end">
            <div>
              <form
                onSubmit={(e) => onSearchHandler(e)}
                className={styles.flex}
              >
                <div>
                  <Input type="select" name="key">
                    <option value="id">ID</option>
                    <option value="name">Name</option>
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
        <div style={{ backgroundColor: "white" }}>
          <ReactTable
            className="invoices-table"
            loading={loading}
            loadingText={<CircularProgress />}
            data={customerList}
            columns={columns}
            onPageChange={(pg) => handlePageChange(pg)}
            // onSortedChange={(newSorted) => handleSorting(newSorted)}
            page={variables.page}
            manual
            pages={Math.ceil(totalCustomers / 7) - 1}
            showPageSizeOptions={false}
            showPageJump={false}
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

export default CustomersList;
