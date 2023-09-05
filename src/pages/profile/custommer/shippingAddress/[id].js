import React, { useEffect, useState } from "react";
import NavbarLogin from "../../../../components/navbarLogin";
import SidebarCustommer from "../../../../components/sidebarCustommer";
import ModalCreate from "../../../../components/modalCreateAddress";
import ModalUpdate from "../../../../components/modalUpdateAddress";
import axios from "axios";

function ShippingAddress() {
  const usersId = localStorage.getItem("usersId");
  const [address, setAddress] = useState([]);

  const fetchAddressData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/address/${usersId}`)
      .then((response) => {
        setAddress(response.data.data[0]);
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
  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarCustommer />
        <div
          id="myProduct"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1245px",
            height: "900px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div
            className="card"
            style={{ width: 850, height: 636, backgroundColor: "white" }}
          >
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">Choose another address</h5>
              <p style={{ color: "#9B9B9B" }}>Manage your shipping address</p>
              <div
                style={{
                  width: 800,
                  border: "1px solid",
                  borderColor: "#D4D4D4",
                }}
              ></div>
              <div className="mt-5">
                <ModalCreate />
                {address ? (
                  <div
                    className="addressNew mt-4"
                    style={{
                      maxWidth: "100%",
                      width: "710px",
                      height: "210px",
                      border: "1px solid #DB3022",
                      borderRadius: "8px",
                      margin: "0 auto",
                      padding: "0",
                    }}
                  >
                    <div className="m-3">
                      <h6>{address.recipient_name}</h6>
                      <span>{address.phone}</span>
                      <p style={{ maxWidth: "100%", height: 58 }}>
                        {address.address_as}, {address.address}, {address.city},{" "}
                        {address.postal_code}
                      </p>
                      <ModalUpdate />
                    </div>
                  </div>
                ) : (
                  <div
                    className="addressNew mt-4"
                    style={{
                      maxWidth: "100%",
                      width: "710px",
                      height: "210px",
                      border: "1px solid #DB3022",
                      borderRadius: "8px",
                      margin: "0 auto",
                      padding: "0",
                    }}
                  >
                    <h6 className="m-3">No address.</h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingAddress;
