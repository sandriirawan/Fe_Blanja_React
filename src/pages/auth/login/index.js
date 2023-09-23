import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/icon.png";
import Swal from 'sweetalert2';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSellerLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/seller/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("usersId", response.data.data.id);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
      });
      navigate("/home");
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleCustomerLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/custommer/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("usersId", response.data.data.id);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
      });
      navigate("/home");
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <main id="login">
      <div className="container">
        <img src={logo} alt="logo" />
        <h6 className="text-center py-3 font-weight-bold">
          Please login with your account
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
        {/* seller */}
        <div className="tab-content mt-4" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <h6 className="link float-right py-3 ">Forgot password?</h6>
                <button
                  type="button"
                  className="btn btn-block rounded-pill"
                  onClick={handleCustomerLogin}
                >
                  <h6 className="login">LOGIN</h6>
                </button>
              </div>
            </form>
            <h6 className="text-regis">
              Don't have a shop.id account?
              <Link style={{ textDecoration: "none" }} to="/register">
                Register
              </Link>
            </h6>
          </div>
          {/* customer */}
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <form>
              <div className="form-group">
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <h6 className="link float-right py-3 ">Forgot password?</h6>
                <button
                  type="button"
                  className="btn btn-block rounded-pill"
                  onClick={handleSellerLogin}
                >
                  <h6 className="login">LOGIN</h6>
                </button>
              </div>
            </form>
            <h6 className="text-regis">
              Don't have a shop.id account?
              <Link style={{ textDecoration: "none" }} to="/register">
                Register
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
