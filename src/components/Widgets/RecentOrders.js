/**
 * Recent Orders
 */
import React from "react";

const RecentOrders = ({ orderStats }) => {
  console.log(orderStats);
  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Order ID</th>
            {/* <th>Invoice</th> */}
            <th>Customer Name</th>
            <th>Profitment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderStats?.recentOrders &&
            orderStats?.recentOrders.map((order, key) => (
              <tr key={key}>
                <td>#{order.id}</td>
                {/* <td>{order.invoice}</td> */}
                <td>
                  <span className="d-block fw-normal text-capitalize">
                    {order.client.name}
                  </span>
                  <span className="fs-12">{order.client.email}</span>
                </td>
                <td>Rs {order.amount}</td>
                <td>
                  {order.status === "pending" ? (
                    <span
                      style={{
                        borderRadius: "6px",
                        fontSize: "10px",
                        padding: "4px 20px 4px 20px",
                        fontWeight: "normal",
                        backgroundColor: "#00d1d1",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      {order.status}
                    </span>
                  ) : (
                    <>
                      {order.status === "completed" ? (
                        <span
                          style={{
                            borderRadius: "6px",
                            fontSize: "10px",
                            padding: "4px 20px 4px 20px",
                            fontWeight: "normal",
                            backgroundColor: "#1e97f3",
                            color: "white",
                            textTransform: "capitalize",
                          }}
                        >
                          {order.status}
                        </span>
                      ) : (
                        <span
                          style={{
                            borderRadius: "6px",
                            fontSize: "10px",
                            padding: "4px 20px 4px 20px",
                            fontWeight: "normal",
                            backgroundColor: "#FF2400",
                            color: "white",
                            textTransform: "capitalize",
                          }}
                        >
                          {order.status}
                        </span>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
