import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SidebarSeller() {
  const navigate = useNavigate();
  const usersId = localStorage.getItem("usersId");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/seller/${usersId}`)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div style={{ width: "400px", backgroundColor: "white" }}>
        <div className="container" style={{ marginTop: 120, paddingLeft: 100 }}>
          <div className="d-flex align-items-center">
            <img
              style={{ width: 60, height: 60, borderRadius: "50%",  objectFit: "cover", }}
              src={
                data.photo
                  ? data.photo
                  : require("../../assets/Make Your Day.jpg")
              }
              alt="Gambar 1"
            />
            <div style={{ marginLeft: 10 }}>
              <h6 style={{ margin: 0 }}>{data.store_name}</h6>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/profile/edit-seller/${usersId}`}
              >
                <i class="bi bi-pencil-fill"> Ubah Profile</i>
              </Link>
            </div>
          </div>
          <div className="d-flex align-items-center " style={{ marginTop: 74 }}>
            <i
              class="bi bi-house-door mr-3"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#456BF3",
                color: "white",
                textAlign: "center",
                padding: 3,
              }}
            ></i>
            <div>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/profile/seller/${usersId}`}
              >
              <h6>Store</h6>
              </Link>
               
            </div>
          </div>
          <div className="d-flex mt-3 mb-2">
            <i
              class="bi bi-box mr-3"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#F36F45",
                color: "white",
                textAlign: "center",
                padding: 4,
              }}
            ></i>
            <div className="mt-1">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/profile/my-product/${usersId}`}
              >
                <h6>My products</h6>
              </Link>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={"/profile/selling-product"}
              >
                <h6 className="mt-2">Selling products</h6>
              </Link>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <i
              class="bi bi-cart mr-3"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#F3456F",
                color: "white",
                textAlign: "center",
                padding: 3,
              }}
            ></i>
            <div>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/profile/my-order/${usersId}`}
              >
              <h6>Order</h6>
              </Link>
             
            </div>
          </div>
          <div className="d-flex align-items-center mt-3" onClick={handleLogout}>
            <i
              className="bi bi-box-arrow-left mr-3"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "red",
                color: "white",
                textAlign: "center",
                padding: 3,
              }}
            ></i>
            <h6 style={{ color: "red", margin: 0 }}>Log out</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarSeller;
