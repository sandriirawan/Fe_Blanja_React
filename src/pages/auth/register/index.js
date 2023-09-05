import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/icon.png";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


function Register() {
  let [custommerData, setCustommerData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    store_name:"",
  });

  let onChangeCustommer = (e) => {
    setCustommerData({
      ...custommerData,
      [e.target.name]: e.target.value,
    });
  };

  let onChangeSeller = (e) => {
    setSellerData({
      ...sellerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSellerRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/seller/register`,
        sellerData
      );
      console.log("register successful:", response.data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered as a seller.',
      });
    } catch (error) {
      console.error("register error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: 'An error occurred during registration. Please try again later.',
      });
    }
  };

  const handleCustommerRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/custommer/register`,
        custommerData
      );
      console.log("register successful:", response.data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered as a custommer.',
      });
    } catch (error) {
      console.error("register error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: 'An error occurred during registration. Please try again later.',
      });
    }
  };

  return (
    <main id="register">
      <div className="container">
        <img src={logo} alt="logo" />
        <h6 className="text-center py-3 font-weight-bold">
          Please sign up with your account
        </h6>
        <ul
          className="nav nav-pills mt-4 justify-content-center"
          id="pills-tab"
          role="tablist"
        >
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
              Customer
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-toggle="pill"
              data-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Seller
            </button>
          </li>
        </ul>
        <div className="tab-content mt-4" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            {/* customer */}
            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={custommerData.name}
                  onChange={onChangeCustommer}
                />
              </div>
              <div className="form-group">
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  value={custommerData.email}
                  onChange={onChangeCustommer}
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={custommerData.password}
                  onChange={onChangeCustommer}
                />
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-block rounded-pill" onClick={handleCustommerRegister}>
                  <h6 className="register">SIGN UP</h6>
                </button>
              </div>
            </form>
            <h6 className="text-regis">
              Already have shop.id account?
              <Link style={{ textDecoration: "none" }} to="/login">
                Login
              </Link>
            </h6>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            {/* seller */}
            <form>
              <div className="form-group">
                <input
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  value={sellerData.name}
                  onChange={onChangeSeller}
                />
              </div>
              <div className="form-group">
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  value={sellerData.email}
                  onChange={onChangeSeller}
                />
              </div>
              <div className="form-group">
                <input
                  name="phone"
                  className="form-control"
                  placeholder="Phone number"
                  type="text "
                  value={sellerData.phone}
                  onChange={onChangeSeller}
                />
              </div>
              <div className="form-group">
                <input
                  name="store_name"
                  className="form-control"
                  placeholder="Store name"
                  type="text"
                  value={sellerData.store_name}
                  onChange={onChangeSeller}
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={sellerData.password}
                  onChange={onChangeSeller}
                />
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-block rounded-pill" onAuxClick={handleSellerRegister}>
                  <h6 className="register">SIGN UP</h6>
                </button>
              </div>
            </form>
            <h6 className="text-regis">
              Already have a shop.id account?
              <Link style={{ textDecoration: "none" }} to="/login">
                Login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
