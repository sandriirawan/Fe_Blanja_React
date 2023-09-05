import React, { useEffect, useState } from "react";
import NavbarLogin from "../../../../components/navbarLogin";
import SidebarCustommer from "../../../../components/sidebarCustommer";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

function MyOrderCustommer() {
  const usersId = localStorage.getItem("usersId");
  const [data, setData] = useState([]);
  const [pending, setPending] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [sent, setSent] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancel, setCancel] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/orders/custommer/${usersId}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/orders/custommer/${usersId}/pending`)
      .then((response) => {
        setPending(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/orders/custommer/${usersId}/processed`)
      .then((response) => {
        setProcessed(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/orders/custommer/${usersId}/sent`)
      .then((response) => {
        setSent(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/orders/custommer/${usersId}/completed`)
      .then((response) => {
        setCompleted(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/orders/custommer/${usersId}/cancel`)
      .then((response) => {
        setCancel(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  
  const handleCompleted = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_KEY}/orders/${id}/completed`);
      console.log("update successfully");
    } catch (error) {
      console.error("Error update:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_KEY}/orders/${id}/cancel`);
      console.log("update successfully");
    } catch (error) {
      console.error("Error update :", error);
    }
  };

  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarCustommer />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1245px",
            height: "1170px",
            backgroundColor: "#F5F5F5",
          }}
          id="myProduct"
        >
          <div
            className="card"
            style={{ width: 850, height: 900, backgroundColor: "white" }}
          >
            {" "}
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">My order</h5>

              <ul className="nav nav-pills mt-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    data-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    All items
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-paid-tab"
                    data-toggle="pill"
                    data-target="#pills-paid"
                    type="button"
                    role="tab"
                    aria-controls="pills-paid"
                    aria-selected="false"
                  >
                    Not yet paid
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-prosess-tab"
                    data-toggle="pill"
                    data-target="#pills-prosess"
                    type="button"
                    role="tab"
                    aria-controls="pills-prosess"
                    aria-selected="false"
                  >
                    Processed
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-sent-tab"
                    data-toggle="pill"
                    data-target="#pills-sent"
                    type="button"
                    role="tab"
                    aria-controls="pills-sent"
                    aria-selected="false"
                  >
                    Sent
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-completed-tab"
                    data-toggle="pill"
                    data-target="#pills-completed"
                    type="button"
                    role="tab"
                    aria-controls="pills-completed"
                    aria-selected="false"
                  >
                    Completed
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-cancel-tab"
                    data-toggle="pill"
                    data-target="#pills-cancel"
                    type="button"
                    role="tab"
                    aria-controls="pills-cancel"
                    aria-selected="false"
                  >
                    Order cancel
                  </button>
                </li>
              </ul>
              <div style={{ width: 800, border: "1px solid #D4D4D4" }}></div>
              <div className="tab-content mt-4" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  {data.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.photo_product}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.product_name}</h5>
                          <h6>Order Size : {item.order_size}</h6>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status Order :{" "}
                            <span className="font-weight-bold text-info">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-paid"
                  role="tabpanel"
                  aria-labelledby="pills-paid-tab"
                >
                  {pending.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 350,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.photo_product}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.product_name}</h5>
                          <h6>Order Size : {item.order_size}</h6>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-success">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                        <Link to={`/transaction/${usersId}`} style={{ color: "inherit", textDecoration: "none" }}>
                          <button
                            className="btn bg-success mr-3"
                            style={{
                              color: "white",
                            }}
                          >
                            <i class="bi bi-cart"></i>
                            <h6>Payment</h6>
                          </button>
                        </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-prosess"
                  role="tabpanel"
                  aria-labelledby="pills-prosess-tab"
                >
                  {processed.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.photo_product}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.product_name}</h5>
                          <h6>Order Size : {item.order_size}</h6>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-warning">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-sent"
                  role="tabpanel"
                  aria-labelledby="pills-sent-tab"
                >
                  {sent.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.photo_product}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.product_name}</h5>
                          <h6>Order Size : {item.order_size}</h6>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-info">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                        <button
                            className="btn bg-success mr-1"
                            style={{
                              color: "white",
                            }}
                            onClick={() => handleCompleted(item.id)}
                          >
                            <h6>Order Received</h6>
                          </button>
                          <button
                            className="btn bg-danger"
                            style={{
                              color: "white",
                            }}
                            onClick={() => handleCancel(item.id)}
                          >
                            <h6>Order cancel</h6>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-completed"
                  role="tabpanel"
                  aria-labelledby="pills-completed-tab"
                >
                  {completed.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.photo_product}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.product_name}</h5>
                          <h6>Order Size : {item.order_size}</h6>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-success">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-success mr-3"
                            style={{
                              color: "white",
                            }}
                          >
                            <i
                              class="bi bi-check-square"
                              style={{ fontSize: 34 }}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-cancel"
                  role="tabpanel"
                  aria-labelledby="pills-cancel-tab"
                >
                  {cancel.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.photo_product}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.product_name}</h5>
                          <h6>Order Size : {item.order_size}</h6>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-danger">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-danger mr-3"
                            style={{
                              color: "white",
                            }}
                          >
                            <i
                              class="bi bi-x-square"
                              style={{ fontSize: 34 }}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrderCustommer;
