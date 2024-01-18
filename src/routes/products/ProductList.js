import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as Actions from "store/actions";
import * as Actions from "../../store/actions";
import ReactTable from "react-table-6";
import qs from "query-string";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Input, Col, Row, Button } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { AiTwotoneEdit } from "react-icons/ai";
import history from "@history";
import "react-table-6/react-table.css";
import { Link } from "react-router-dom";
import ConfrimDialogue from "../../components/Dialogue/ConfrimDialogue";
import styles from "./Product.module.css";

const ProductList = (props) => {
  const query_str = qs.parse(props.location.search);
  if (query_str.search) {
    query_str.search = "";
  }
  const dispatch = useDispatch();
  const [variables, setVariables] = useState({ ...query_str });
  const [dialogue, setDialogue] = useState(false);
  const [rowId, setRowId] = useState(null);
  const productListReducer = useSelector((state) => state.products);
  const { loading, productList, totalProducts } = productListReducer;
  console.log(productList);

  useEffect(() => {
    if (productListReducer) {
      const q_str = qs.stringify(variables);
      history.push({ search: q_str });
      dispatch(Actions.productLoading(true));
      dispatch(Actions.getProducts(variables));
    }
  }, [variables]);

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
  const handlePageChange = (pg) => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };
  const columns = [
    {
      maxWidth: 60,
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
      maxWidth: 80,
      Header: "Price",
      accessor: "price",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      maxWidth: 80,
      Header: "Discount",
      accessor: "discount",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      maxWidth: 80,
      Header: "Quantity",
      accessor: "quantity",
      style: { textAlign: "center", backgroundColor: "white" },
    },
    {
      maxWidth: 90,
      Header: "Unit",
      accessor: "unitQuantity",
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
            <Link to={`/admin/editproduct/${props.original.id}`}>
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
          <h2 className="">Product List</h2>
        </div>
      </div>
      <div style={styless.main}>
        <div className="">
          <div className={styles.flex_container}>
            <div>
              <Link to={`/admin/addproduct`}>
                <Button color="danger" variant="outlined">
                  Add Product
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
        <div className="">
          <ConfrimDialogue
            open={dialogue}
            handleClose={() => setDialogue(false)}
            action={() => {
              dispatch(Actions.deleteProduct(rowId, variables));
              setDialogue(false);
            }}
            msg={"Are you sure you want to Delete ?"}
          />
          <ReactTable
            style={{ backgroundColor: "white" }}
            className="invoices-table"
            loading={loading}
            loadingText={<CircularProgress />}
            data={productList}
            columns={columns}
            onPageChange={(pg) => handlePageChange(pg)}
            page={variables.page}
            manual
            pages={Math.ceil(totalProducts / 10)}
            showPageSizeOptions={false}
            showPageJump={true}
            noDataText={"No Product Found"}
            // defaultPageSize={7}
            minRows={3}
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

export default ProductList;
