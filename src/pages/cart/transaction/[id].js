import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarLogin from "../../../components/navbarLogin";
import ModalAddress from "../../../components/modalAddress";
import ModalPayment from "../../../components/modalPayment";
import Swal from "sweetalert2";

function Transaction() {
  const usersId = localStorage.getItem("usersId");
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/orders/custommer/${usersId}/pending`)
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  const fetchAddressData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/address/${usersId}`)
      .then((response) => {
        setAddress(response.data.data);
        setAddressId(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchAddressData();
    const intervalId = setInterval(fetchAddressData, 5000);
    return () => clearInterval(intervalId);
  }, [usersId]);

  const [delivery, setDelivery] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/delivery`)
      .then((response) => {
        setDelivery(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalCartPrice = orders.reduce((total, item) => {
    const itemQuantity = item.quantity;
    return total + item.price * itemQuantity;
  }, 0);

  const totalDeliveryPrice = delivery.reduce((total, item) => {
    return total + item.delivery_price;
  }, 0);

  const totalSummaryPrice =
    parseInt(totalCartPrice) + parseInt(totalDeliveryPrice);

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prevSelectedOrders) => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter((id) => id !== orderId);
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  const handleUpdateSelectedOrders = async () => {
    try {
      await Promise.all(
        selectedOrders.map(async (orderId) => {
          await axios.put(`${process.env.REACT_APP_API_KEY}/orders/${orderId}`, {
            address_id: addressId.id,
          });
        })
      );
      console.log("Update successfully");
      setSelectedOrders([]);
    } catch (error) {
      console.error("Error updating orders:", error);
      Swal.fire("Error", "An error occurred while updating orders", "error");
    }
  };

  return (
    <>
      <NavbarLogin />
      <main id="transaction">
        <div className="container" style={{ paddingBottom: 100 }}>
          <h1 className="font-weight-bold">Checkout</h1>
          <h6>Shipping Adress</h6>
          <div className="row">
            <div className="col-md-8">
              <div className="card mt-3 cardKiri">
                <div className="m-4 ">
                  {address.length > 0 ? (
                    address.map((item) => (
                      <div key={item.id}>
                        <h6>{item.recipient_name}</h6>
                        <span>{item.phone}</span>
                        <p>
                          {item.address_as}, {item.address}, {item.city},{" "}
                          {item.postal_code}
                        </p>
                        <ModalAddress item={item} />
                      </div>
                    ))
                  ) : (
                    <ModalAddress />
                  )}
                </div>
              </div>
              {orders.map((item) => (
                <div className="card mt-3 cardOrder" key={item.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <input
                    className="ml-5"
                      type="checkbox"
                      checked={selectedOrders.includes(item.id)}
                      onChange={() => toggleOrderSelection(item.id)}
                    />
                    <div className="ml-5 wrapImage">
                      <img
                        style={{ width: 70, height: 70,objectFit:"cover"  }}
                        src={item.photo_product}
                        alt="Gambar 1"
                      />
                    </div>
                    <div className="row ml-2 wrap ">
                      <div className="font-weight-bold wrapTitle">
                        {item.product_name}
                      </div>
                      <span className="text-secondary wrapTitle">
                        quantity : {item.quantity}
                      </span>
                    </div>
                    <div
                      className="font-weight-bold mr-3 price"
                      style={{ width: 140 }}
                    >
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card cardKanan mt-3 ">
                <div className="p-3">
                  <h6 className="font-weight-bold">Shopping summary</h6>
                  <div className="row mt-4">
                    <div className="col" style={{ color: "#9B9B9B" }}>
                      Order
                    </div>
                    <div className="col text-right font-weight-bold mr-1">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(totalCartPrice)}
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col" style={{ color: "#9B9B9B" }}>
                      Delivery
                    </div>
                    {delivery.map((item) => (
                      <div className="col text-right font-weight-bold mr-1">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(totalDeliveryPrice)}
                      </div>
                    ))}
                  </div>
                  <div className="line mt-3"></div>
                  <div className="row mt-3">
                    <div className="col font-weight-bold">Shopping summary</div>
                    <div className="col text-right font-weight-bold mr-1 text-danger">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(totalSummaryPrice)}
                    </div>
                  </div>
                  <ModalPayment
                    totalSummaryPrice={totalSummaryPrice}
                    delivery={delivery}
                    totalCartPrice={totalCartPrice}
                    handleUpdateSelectedOrders={handleUpdateSelectedOrders} 
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Transaction;
