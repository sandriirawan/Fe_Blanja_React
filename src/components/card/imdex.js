import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Card() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/product`)
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (productId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/product/${productId}`);
    }
  };
  return (
    <div className="container">
      <div className="title" style={{ marginTop: 80, marginBottom: 30 }}>
        <h1 style={{ fontWeight: "bold" }}>New</h1>
        <section style={{ color: "#9B9B9B" }}>
          You’ve never seen it before!
        </section>
      </div>

      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="row">
          {products.map((item) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4"
              key={item.id}
              style={{ width: 222 }}
            >
              <div
                className="border rounded product"
                style={{ height: 340 }}
                onClick={() => handleProductClick(item.id)} 
              >
                <img
                  className=" img-fluid"
                  src={item.photo_product}
                  crossOrigin="anonymous"
                  alt="cloth"
                  style={{
                    width: "100%",
                    maxHeight: "136px",
                    objectFit: "cover",
                  }}
                />
                <div className="p-2">
                  <h5
                    className="card-title mt-2"
                    style={{ width: 184, height: 48 }}
                  >
                    {item.product_name}
                  </h5>
                  <h5 className="text-danger mt-2">
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(item.price)}
                  </h5>
                  <p style={{ color: "#9B9B9B" }}>{item.store_name}</p>
                  <img
                    src={require("../../assets/Rating 5 stars.png")}
                    alt="stars"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;