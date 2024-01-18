import React, { Children, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { FormGroup, Label, Col, Button, FormText } from "reactstrap";
import * as Actions from "../../store/actions";
import uploadImage from "../../assets/img/upload_image.png";

const AddProduct = (props) => {
  const [Images, setImages] = React.useState([]);
  const [url, setUrl] = React.useState([]);
  const [maxUploadError, setMaxUploadError] = React.useState([]);
  // This function will be triggered when the file field change

  const imageChange = (e) => {
    if (e.target.files.length > 5) {
      return setMaxUploadError("You have selected more than 5 images");
    }
    if (Images.length === 0) {
      setImages([...e.target.files]);
    } else if (Images.length <= 5) {
      setImages([...Images, ...e.target.files]);
    } else {
      return;
    }
  };
  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = (indx) => {
    const s = Images.filter((item, index) => index !== indx);
    setImages(s);
  };
  const handleChangeImage = (i) => {
    const s = url.filter((item, index) => index !== i);
    setUrl(s);
  };
  const { categoryList, productDetail, loading, error } = useSelector(
    (state) => state.products
  );
  let productId;
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  let requestType = "add_product";

  if (location.pathname.includes("edit")) {
    productId = id;
    requestType = "edit_product";
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    Array.from(Images).forEach((img) => {
      formdata.append("uploaded_file", img);
    });
    if (requestType === "edit_product" && productId) {
      formdata.append("url", JSON.stringify(url.map((u) => u.toString())));
    }
    formdata.append("price", data.price);
    formdata.append("description", data.description);
    formdata.append("categoryId", parseInt(data.category));
    formdata.append("quantity", data.quantity);
    formdata.append("discount", data.discount);
    formdata.append("unitQuantity", data.unitQuantity);
    if (requestType === "edit_product" && productId) {
      dispatch(Actions.productLoading(true));
      dispatch(Actions.updateProduct(productId, formdata));
    } else {
      dispatch(Actions.productLoading(true));
      dispatch(Actions.addProduct(formdata));
    }
  };
  useEffect(() => {
    if (requestType === "edit_product" && productId) {
      let tempId = parseInt(productId);
      if (productDetail?.id === tempId) {
        setValue("title", productDetail?.title);
        setValue("price", productDetail?.price);
        setValue("description", productDetail?.description);
        setValue("quantity", productDetail?.quantity);
        setValue("unitQuantity", productDetail?.unitQuantity);
        setValue("category", productDetail?.categoryId);
        setValue("discount", productDetail?.discount);
        const temp = productDetail?.productImages?.map((img) => img.url);
        setUrl(temp);
      } else {
        dispatch(Actions.productLoading(true));
        dispatch(Actions.getProductById(productId));
      }
    }
    if (!productDetail.title) {
      dispatch(Actions.productLoading(true));
      dispatch(Actions.getCategory());
    }
  }, [dispatch, setValue, productDetail, productId, requestType]);
  return (
    <div>
      <div className="page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i
            style={{ cursor: "pointer" }}
            onClick={props.history.goBack}
            className="ti-angle-left"
          ></i>
          <h2 className="">
            {requestType === "edit_product" ? "Update" : "Add"} Product
          </h2>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        ""
      ) : (
        <div className="container" style={styles.main}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup row>
              <Label for="title" sm={2}>
                Title
              </Label>
              <Col sm={8}>
                <input
                  style={{ border: "none" }}
                  id="title"
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 80,
                      message: "max length should be 80",
                    },
                  })}
                // style={{ borderColor: "1px solid #DCDCDC" }}
                />
                <FormText>
                  {errors.title && <p>{errors.title.message}</p>}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="price" sm={2}>
                Price
              </Label>
              <Col sm={8}>
                <input
                  style={{ border: "none" }}
                  id="price"
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    maxLength: {
                      value: 6,
                      message: "max length should be 6",
                    },
                  })}
                />
                <FormText>
                  {errors.price && <p>{errors.price.message}</p>}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="discount" sm={2}>
                Discount
              </Label>
              <Col sm={8}>
                <input
                  style={{ border: "none" }}
                  id="discount"
                  type="number"
                  {...register("discount", {
                    required: "Discount is required",
                    maxLength: {
                      value: 3,
                      message: "max length should be 3",
                    },
                  })}
                />
                <FormText>
                  {errors.discount && <p>{errors.discount.message}</p>}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="quantity" sm={2}>
                Quantity
              </Label>
              <Col sm={8}>
                <input
                  style={{ border: "none" }}
                  id="quantity"
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    maxLength: {
                      value: 3,
                      message: "max length should be 3",
                    },
                  })}
                />

                <FormText>
                  {errors.quantity && <p>{errors.quantity.message}</p>}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="quantity" sm={2}>
                Unit
              </Label>
              <Col sm={8}>
                <select
                  style={{ border: "none" }}
                  id="unitQuantity"
                  {...register("unitQuantity", {
                    required: "Unit is required",
                  })}
                >
                  <option>KG</option>
                  <option>Pieces</option>
                  <option>Packs</option>
                  <option>Cartons</option>
                </select>

                <FormText>
                  {errors.uniQuantity && <p>{errors.unitQuantity.message}</p>}
                </FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="description" sm={2}>
                Description
              </Label>
              <Col sm={8}>
                <textarea
                  style={{ border: "none" }}
                  id="description"
                  rows={5}
                  {...register("description", {
                    required: "Description is required",

                    maxLength: {
                      value: 400,
                      message: "max length should be 400",
                    },
                  })}
                />
                <FormText>
                  {errors.description && <p>{errors.description.message}</p>}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="image" sm={2}>
                Upload Image
              </Label>
              <Col sm={10}>
                <div className="d-flex">
                  {requestType === "edit_product" && productId ? (
                    <>
                      {url.map((url, i) => {
                        return (
                          <div key={i} style={styles.preview2}>
                            <div>
                              <img src={url} style={styles.image} alt="Thumb" />
                            </div>
                            <div>
                              <button
                                onClick={() => handleChangeImage(i)}
                                style={styles.delete}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {Children.toArray(
                        Array.from(Images).map((img, index) => {
                          return (
                            <div style={styles.preview2}>
                              <div>
                                <img
                                  id="image"
                                  src={img ? URL.createObjectURL(img) : null}
                                  style={styles.image}
                                  alt="Thumb"
                                />
                              </div>
                              <div>
                                <button
                                  onClick={() => removeSelectedImage(index)}
                                  style={styles.delete}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div>
                        {Images.length + url.length !== 5 ? (
                          <div
                            for="image"
                            style={{
                              marginLeft: "2px",
                              position: "relative",
                              minHeight: "9rem",
                              minWidth: "9rem",
                              maxHeight: "10rem",
                              maxWidth: "10rem",
                            }}
                          >
                            <Label for="image">
                              <img
                                for="image"
                                src={uploadImage}
                                style={{
                                  position: "relative",
                                  minHeight: "9rem",
                                  minWidth: "9rem",
                                  maxHeight: "10rem",
                                  maxWidth: "11rem",
                                }}
                              ></img>
                            </Label>

                            <input
                              style={{
                                maxWidth: "1rem",
                                maxHeight: "0.6rem",
                                position: "absolute",
                                left: "4.5rem",
                                bottom: "4.8rem",
                              }}
                              multiple
                              accept="image/*"
                              id="image"
                              name="file"
                              type="file"
                              {...register("image", {
                                onChange: (e) => {
                                  imageChange(e);
                                },
                              })}
                            />
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <>
                      {Children.toArray(
                        Array.from(Images).map((img, index) => {
                          return (
                            <div style={styles.preview2}>
                              <div>
                                <img
                                  id="image"
                                  src={img ? URL.createObjectURL(img) : null}
                                  style={styles.image}
                                  alt="Thumb"
                                  {...register("image", {
                                    onChange: (e) => {
                                      imageChange(e);
                                    },
                                  })}
                                />
                                <button
                                  onClick={() => removeSelectedImage(index)}
                                  style={styles.delete}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                      {Images.length + url.length !== 5 ? (
                        <div
                          style={{
                            marginLeft: "2px",
                            position: "relative",
                            minHeight: "9rem",
                            minWidth: "9rem",
                            maxHeight: "10rem",
                            maxWidth: "10rem",
                          }}
                        >
                          <Label for="image">
                            <img
                              src={uploadImage}
                              style={{
                                position: "relative",
                                minHeight: "9rem",
                                minWidth: "9rem",
                                maxHeight: "10rem",
                                maxWidth: "11rem",
                              }}
                            ></img>
                          </Label>

                          <input
                            style={{
                              maxWidth: "1rem",
                              maxHeight: "0.6rem",
                              position: "absolute",
                              left: "4.5rem",
                              bottom: "4.8rem",
                            }}
                            multiple
                            accept="image/*"
                            id="image"
                            name="file"
                            type="file"
                            {...register("image", {
                              onChange: (e) => {
                                imageChange(e);
                              },
                            })}
                          />
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
                <FormText>
                  {errors.image && errors.image.message}
                  {maxUploadError}
                </FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="category" sm={2}>
                Choose Category
              </Label>
              <Col sm={10}>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <span>Category Not Found</span>
                ) : (
                  <>
                    <select
                      id="category"
                      {...register("category", {
                        required: "Category is required",
                      })}
                      style={{
                        border: "none",

                        width: "44.4rem",
                        height: "2.2rem",
                      }}
                    >
                      {categoryList?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <FormText>
                      {errors.category && errors.category.message}
                    </FormText>
                  </>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={3}>
                {requestType === "edit_product" ? (
                  <Button>Update Product</Button>
                ) : (
                  <Button color="danger">Add Product</Button>
                )}
              </Col>
            </FormGroup>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

const styles = {
  main: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "2rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    marginLeft: "10px",
    display: "flex",
    height: "8rem",
    justifyContent: "space-between",
    flexDirection: "column",
    border: "1px solid grey",
    borderRadius: " 5px 30px 5px 30px",
  },
  preview2: {
    position: "relative",
    backgroundColor: "grey",
    marginLeft: "2px",
    display: "flex",
    height: "10rem",
    width: "10rem",
    justifyContent: "space-between",
    flexDirection: "column",
    border: "1px solid grey",
    borderRadius: " 30px",
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "16px",
    maxWidth: "8rem",
    maxHeight: "8rem",
  },
  delete: {
    border: "none",
    borderTop: "1px solid black",
    bottom: "-11px",
    minWidth: "10rem",
    height: "2.3rem",
    marginBottom: "10px",
    borderRadius: "0px 0px 30px 30px",
    cursor: "pointer",
    background: "red",
    color: "white",
    border: "none",
    position: "absolute",
    left: "-1px",
  },
  change: {
    minWidth: "10.9rem",
    borderRadius: "0 0 30px 30px",
    cursor: "pointer",
    background: "red",
    color: "white",
    border: "none",
  },
};
