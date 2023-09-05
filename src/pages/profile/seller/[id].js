import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarLogin from "../../../components/navbarLogin";
import SidebarSeller from "../../../components/sidebarSeller";

function Seller() {
  const usersId = localStorage.getItem("usersId");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/seller/${usersId}`)
      .then((response) => {
        setData(response.data.data[0]);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);
  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarSeller />
        <div
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
              <h5 className="font-weight-bold mb-3">My profile store</h5>
              <div style={{ width: 800, border: "1px solid" }}></div>

              <div
                className="d-flex flex-column align-items-center"
                style={{ marginTop: 60 }}
              >
                <img
                  style={{ width: 120, height: 120, borderRadius: "50%",  objectFit: "cover", }}
                  src={
                    data.photo
                      ? data.photo
                      : require("../../../assets/Make Your Day.jpg")
                  }
                  alt="Product"
                />

                <h6 style={{ marginTop: "10px" }}>{data.store_name}</h6>
                <h6 style={{}}>{data.email}</h6>
                <h6 style={{}}>{data.phone}</h6>
                <h6 style={{ textAlign: "center" }}>
                  {data.store_description}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Seller;
