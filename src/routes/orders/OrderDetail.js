import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import style from "./OrderList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ConfrimDialogue from "components/Dialogue/ConfrimDialogue";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  List,
  ListInlineItem,
  Input,
} from "reactstrap";
import * as Actions from "../../store/actions";
import moment from "moment";

const OrderDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetailReducer = useSelector((state) => state.orders);
  const { error, loading, orderDetail } = orderDetailReducer;
  const [render, setRender] = useState(false);

  const [dialogue, setDialogue] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    dispatch(Actions.OrderLoading(true));
    dispatch(Actions.getOrderDetailsById(id));
  }, [id]);

  useEffect(() => {
    dispatch(Actions.OrderLoading(true));
    dispatch(Actions.getOrderDetailsById(id));
  }, [render]);

  if (error) {
    return <div>Results not found</div>;
  }

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex">
        <div>
          <i
            style={{ cursor: "pointer" }}
            onClick={props.history.goBack}
            className="ti-angle-left"
          ></i>
        </div>

        <h2 className="mx-5">Order Details</h2>
      </div>
      {orderDetail && (
        <Container>
          <Col className="mt-20">
            <Row>
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <CardTitle tag="h5">
                    <h3>General Details</h3>
                  </CardTitle>
                  <CardText>
                    <List type="inline">
                      <ListInlineItem style={{ color: "#808080" }}>
                        Date:
                      </ListInlineItem>
                      <ListInlineItem>
                        {moment(orderDetail.dateOrderPlaced).format(
                          "Do MMMM YYYY"
                        )}
                      </ListInlineItem>
                    </List>
                    <List type="inline">
                      <div>
                        <ListInlineItem style={{ color: "#808080" }}>
                          Status:
                        </ListInlineItem>
                        <ListInlineItem>{orderDetail.status}</ListInlineItem>
                      </div>
                      <div className="mt-10">
                        <ListInlineItem>
                          <div className="d-flex align-items-center">
                            <ConfrimDialogue
                              open={dialogue}
                              handleClose={() => setDialogue(false)}
                              action={() => {
                                dispatch(Actions.OrderLoading(true));
                                dispatch(
                                  Actions.updateOrderStatusById(
                                    id,
                                    value,
                                    setRender
                                  )
                                );
                                setDialogue(false);
                              }}
                              msg={"Are you sure you want to change status?"}
                            />
                            <div style={{ color: "#808080" }}>
                              Change status:
                            </div>
                            <div className="ml-5">
                              <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={(e) => {
                                  setDialogue(true);
                                  setValue(e.target.value);
                                }}
                                className={`${
                                  orderDetail.status === "completed"
                                    ? "border-success"
                                    : orderDetail.status === "canceled"
                                    ? "border-danger"
                                    : ""
                                }`}
                                disabled={
                                  orderDetail.status === "completed" ||
                                  orderDetail.status === "canceled"
                                }
                              >
                                <option
                                  value="pending"
                                  selected={
                                    orderDetail.status === "pending"
                                      ? true
                                      : false
                                  }
                                >
                                  Pending
                                </option>
                                <option
                                  value="completed"
                                  selected={
                                    orderDetail.status === "completed"
                                      ? true
                                      : false
                                  }
                                >
                                  Completed
                                </option>
                                <option
                                  value="canceled"
                                  selected={
                                    orderDetail.status === "canceled"
                                      ? true
                                      : false
                                  }
                                >
                                  Canceled
                                </option>
                              </Input>
                            </div>
                          </div>
                        </ListInlineItem>
                      </div>
                    </List>
                  </CardText>
                </CardBody>
              </Card>
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <CardTitle tag="h5">
                    <h3>Billing Details</h3>
                  </CardTitle>
                  <CardText>
                    <List type="inline">
                      <ListInlineItem style={{ color: "#808080" }}>
                        Customer:
                      </ListInlineItem>
                      <ListInlineItem>{orderDetail.client.name}</ListInlineItem>
                    </List>
                    <List type="inline">
                      <ListInlineItem style={{ color: "#808080" }}>
                        Address:
                      </ListInlineItem>
                      <ListInlineItem>{orderDetail.address}</ListInlineItem>
                    </List>
                    <List type="inline">
                      <ListInlineItem style={{ color: "#808080" }}>
                        Email:
                      </ListInlineItem>
                      <ListInlineItem>
                        {orderDetail.client.email}
                      </ListInlineItem>
                    </List>
                    <List type="inline">
                      <ListInlineItem style={{ color: "#808080" }}>
                        Phone:
                      </ListInlineItem>
                      <ListInlineItem>
                        {orderDetail.client.phone
                          ? orderDetail.client.phone
                          : "none"}
                      </ListInlineItem>
                    </List>
                  </CardText>
                </CardBody>
              </Card>
            </Row>
          </Col>
          <Row className="mt-20">
            <Col>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    <h3 className="">Order Items</h3>
                  </CardTitle>
                  <CardText>
                    {orderDetail.productOrder.map((item) => {
                      return (
                        <div
                          className={style.custom_shadow}
                          style={{
                            boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.20)",
                            padding: "10px",
                          }}
                          key={item.id}
                        >
                          <Row>
                            <Col>
                              <img
                                alt="!#"
                                src={item.product.productImages[0].url}
                                style={{ width: "2rem" }}
                              />
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center">
                              <div>
                                <p>{item.product.title}</p>
                              </div>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center">
                              <div>
                                <p>Rs {item.product.price}</p>
                              </div>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center">
                              <div>
                                <p>{item.quantity} Items </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}

                    {/* <List type="inline">
                    <ListInlineItem>Address:</ListInlineItem>
                    <ListInlineItem>Islamabad</ListInlineItem>
                  </List>
                  <List type="inline">
                    <ListInlineItem>Email:</ListInlineItem>
                    <ListInlineItem>mansoor.abbas651@gmail.com</ListInlineItem>
                  </List> */}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default OrderDetail;
