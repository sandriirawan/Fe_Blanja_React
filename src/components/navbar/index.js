import React from "react";
import logo from "../../assets/icon.png";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header id="navbar">
        {/* navbar */}
        <nav className="navbar fixed-top navbar-expand-lg  p-3">
          <div className="container d-flex align-items-center">
            <img className="logo-shopid" src={logo} alt="logo" />
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon col-md-4" />
            </button>
            <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
              <ul className="navbar-nav search-container ">
                <li className="nav-item">
                  <input
                    className="form-control search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </li>
              </ul>
              <i class="bi bi-search iconSearch" />
              <i className="filter bi bi-funnel" />
              <form className="form-inline wrap">
                <i className="cart bi bi-cart" />
                <button className="login btn rounded-pill">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </button>
                <button className="register btn rounded-pill ">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={"/register"}
                  >
                    Signup
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      {/* end navbar */}
    </>
  );
};

export default Navbar;
