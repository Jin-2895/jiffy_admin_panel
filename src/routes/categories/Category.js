import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as Actions from "store/actions";
import * as Actions from "../../store/actions";
import ReactTable from "react-table-6";
import qs from "query-string";
import { CircularProgress, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
// import { AiOutlinePlusCircle } from "react-icons/ai";
import history from "@history";
import "react-table-6/react-table.css";
// import axios from "axios";
// import Domain from "../../lib/Config";
import styles from "./Category.module.css";
import { AiTwotoneEdit } from "react-icons/ai";
import { Input, Col, Row, Button } from "reactstrap";
import ConfrimDialogue from "components/Dialogue/ConfrimDialogue";
import { Link } from "react-router-dom";

const ProductList = (props) => {
  const query_str = qs.parse(props.location.search);
  // const prod_page = query_str.page ? JSON.parse(query_str.page) : 1;
  const dispatch = useDispatch();
  const [variables, setVariables] = useState({ ...query_str });
  const [dialogue, setDialogue] = useState(false);
  const [rowId, setRowId] = useState(null);
  const productsReducer = useSelector((state) => state.products);
  const { loading, categoryList, totalCategories } = productsReducer;

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
    if (productsReducer) {
      const q_str = qs.stringify(variables);
      history.push({ search: q_str });
      dispatch(Actions.productLoading(true));
      dispatch(Actions.getCategory(variables));
    }
  }, [variables]);

  const handlePageChange = (pg) => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };

  const columns = [
    {
      maxWidth: 75,
      Header: "Id",
      accessor: "id",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      Header: "Title",
      accessor: "title",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (props) => {
        console.log(props);
        return (
          <div>
            <span title={props.original.description}>
              {props.original.description}
            </span>
          </div>
        );
      },
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      Header: "",
      maxWidth: 80,
      sortable: false,
      style: {
        textAlign: "center",
        margin: 0,
        padding: 0,
        backgroundColor: "white",
      },
      Cell: (props) => {
        return (
          <div>
            <IconButton
              style={{ color: "#f94449" }}
              aria-label="delete"
              onClick={() => {
                setDialogue(true);
                setRowId(props.original.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
    {
      Header: "",
      maxWidth: 80,
      sortable: false,
      style: {
        textAlign: "center",
        margin: 0,
        padding: 0,
        backgroundColor: "white",
      },
      Cell: (props) => {
        return (
          <div>
            <Link to={`/admin/editcategory/${props.original.id}`}>
              <IconButton style={{ color: "#1E90ff" }} aria-label="edit">
                <AiTwotoneEdit />
              </IconButton>
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
          <h2 className="truncate">Category</h2>
        </div>
      </div>
      <div className="container" style={styless.main}>
        <div>
          <div className={styles.flex_container}>
            <div>
              <Link to={`/admin/addcategory`}>
                <Button color="danger" variant="outlined">
                  Add Category
                </Button>
              </Link>
            </div>
            <div className={styles.flex}>
              <div>
                <form
                  onSubmit={(e) => onSearchHandler(e)}
                  className={styles.flex}
                >
                  <div>
                    <Input type="select" name="key">
                      <option value="id">ID</option>
                      <option value="title">Title</option>
                    </Input>
                  </div>
                  <div className="mx-10 mb-5">
                    <Row className="justify-content-center">
                      <Col className={styles.padding_0}>
                        <Input
                          type="text"
                          name="value"
                          id="search_input"
                          placeholder="Search query..."
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
        </div>

        <div>
          <ConfrimDialogue
            open={dialogue}
            handleClose={() => setDialogue(false)}
            action={() => {
              dispatch(Actions.deleteCategory(rowId, variables));
              setDialogue(false);
            }}
            msg={"Are you sure you want to Delete ?"}
          />
          <ReactTable
            style={{ backgroundColor: "white" }}
            className="invoices-table"
            loading={loading}
            loadingText={<CircularProgress />}
            data={categoryList}
            columns={columns}
            onPageChange={(pg) => handlePageChange(pg)}
            page={variables.page}
            manual
            pages={Math.round(totalCategories / 7)}
            showPageSizeOptions={false}
            showPageJump={true}
            minRows={1}
            getTdProps={(state, rowInfo, column) => ({
              style: {
                height: "44px",
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

export default ProductList;
