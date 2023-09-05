import React, { useEffect, useState } from "react";
import SidebarSeller from "../../../../components/sidebarSeller";
import NavbarLogin from "../../../../components/navbarLogin";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


function MyProductSeller() {
  const usersId = localStorage.getItem("usersId");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/product/users/${usersId}`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: 'Delete Product',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545', 
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_KEY}/product/${productId}`);
        setProducts(products.filter((item) => item.id !== productId));
        console.log('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarSeller />
        <div
          id="myProduct"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1245px",
            height: "1163px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div
            className="card"
            style={{ width: 850, height: 900, backgroundColor: "white" }}
          >
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">My product</h5>
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
                    id="pills-profile-tab"
                    data-toggle="pill"
                    data-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Sould out
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
                    Archived
                  </button>
                </li>
              </ul>
              <div
                style={{
                  width: 800,
                  border: "1px solid",
                  borderColor: "#D4D4D4",
                }}
              ></div>
              <div className="tab-content mt-4" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div style={{ position: "relative" }}>
                    <input
                      style={{
                        width: 230,
                        color: "#D4D4D4",
                        borderColor: "#D4D4D4",
                        borderRadius: 25,
                        paddingLeft: 30,
                      }}
                      className="form-control search"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <i
                      className="bi bi-search iconSearch"
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#D4D4D4",
                      }}
                    />
                  </div>
                  <div className="" style={{ width: 800, height: 600 }}>
                    {currentProducts.map((item) => (
                      <div
                        className="card border mt-3 p-3"
                        style={{
                          width: 800,
                          height: 170,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        key={item.id}
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
                          <h6 className="text-danger">
                            {" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.price)}
                          </h6>
                          <h6>{item.condition}</h6>
                          <h6>Stock:{item.stock}</h6>
                          <img
                            src={require("../../../../assets/Rating 5 stars.png")}
                            alt="stars"
                          />
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-danger mr-3"
                            style={{
                              width: 30,
                              height: 30,
                              color: "white",
                              padding: 2,
                            }}
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <Link to={`/profile/update-product/${item.id}`}>
                            <button
                              className="btn bg-warning mr-3"
                              style={{
                                width: 30,
                                height: 30,
                                color: "white",
                                padding: 2,
                              }}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                      {Array.from({
                        length: Math.ceil(products.length / productsPerPage),
                      }).map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                ></div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProductSeller;
