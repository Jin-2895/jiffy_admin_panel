import { CircularProgress } from "@material-ui/core";
// import { LocalDrinkRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { FormGroup, Label, Col, Button, FormText } from "reactstrap";
import * as Actions from "../../store/actions";

const AddCategory = (props) => {
  const { categoryDetail, loading, error } = useSelector(
    (state) => state.products
  );
  let categoryID;
  const location = useLocation();
  const { id } = useParams();
  let requestType = "add_category";

  if (location.pathname.includes("edit")) {
    categoryID = id;
    requestType = "edit_category";
  }

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    if (requestType === "edit_category" && categoryDetail?.id === categoryID) {
      dispatch(Actions.productLoading(true));
      dispatch(Actions.updateCategory(categoryID, data));
    } else {
      dispatch(Actions.productLoading(true));
      dispatch(Actions.addCategory(data));
    }
  };

  useEffect(() => {
    if (requestType === "edit_category" && categoryID) {
      let tempId = parseInt(categoryID);
      if (categoryDetail?.id === tempId) {
        setValue("title", categoryDetail?.title);
        setValue("description", categoryDetail?.description);
      } else {
        dispatch(Actions.productLoading(true));
        dispatch(Actions.getCategoryById(categoryID));
      }
    }
  }, [dispatch, setValue, categoryID, categoryDetail, requestType]);

  return (
    <div>
      <div className="p-2 page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i
            style={{ cursor: "pointer" }}
            onClick={props.history.goBack}
            className="ti-angle-left"
          ></i>
          <h2 className="">
            {requestType === "edit_category" ? "Update" : "Add"} Category
          </h2>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        ""
      ) : (
        <div className="container " style={styles.main}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup row>
              <Label for="title" sm={2}>
                Title
              </Label>
              <Col sm={10}>
                <input
                  style={{ border: "none" }}
                  id="title"
                  type="text"
                  {...register("title", {
                    required: "title is required",
                    maxLength: {
                      value: 30,
                      message: "max length should be 30",
                    },
                  })}
                  // style={{ borderColor: "1px solid #DCDCDC" }}
                />
                <FormText>
                  {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                  )}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <textarea
                  style={{ border: "none" }}
                  rows={3}
                  id="description"
                  type="text"
                  {...register("description", {
                    required: "description is required",
                    maxLength: {
                      value: 80,
                      message: "max length should be 80",
                    },
                  })}
                />
                <FormText>
                  {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                  )}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col
                sm={{
                  offset: 2,
                  size: 3,
                }}
              >
                <Button color="danger">
                  {requestType === "edit_category" ? "Update" : "Add"} Category
                </Button>
              </Col>
            </FormGroup>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  main: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "2rem",
  },
};

export default AddCategory;
