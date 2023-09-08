import React, { useEffect, useState } from "react";
import NavbarLogin from "../../components/navbarLogin";
import PopularCard from "../../components/popularCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";

function DetailProduct() {
  const { id } = useParams();
  const usersId = localStorage.getItem("usersId");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/product/${id}`)
      .then((response) => {
        setProduct(response.data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  console.log();
  const colors = product.color ? product.color.split(",") : [];
  const sizes = product.size ? product.size.split(",") : [];

  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const [data, setData] = useState({
    order_size: "",
    order_color: "",
    quantity: "",
    seller_id: "",
    custommer_id: usersId,
    product_id: id,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleaddBag = async (event, addToBag = true) => {
    try {
      const updatedData = {
        ...data,
        order_color: selectedColor,
        order_size: selectedSize,
        quantity: quantity,
        seller_id: product.users_id,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/orders`,
        updatedData
      );

      toast.success("Item added to bag successfully");

      console.log("order created successfully", response);
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  const handleBuy = async (event, addToBag = true) => {
    try {
      const updatedData = {
        ...data,
        order_color: selectedColor,
        order_size: selectedSize,
        quantity: quantity,
        seller_id: product.users_id,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/orders`,
        updatedData
      );
      console.log("order created successfully", response);
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <NavbarLogin />
      <main id="product">
        <div className="container" style={{ marginTop: 120 }}>
          <div className="row">
            <div className="col-md-3 ">
              {loading ? (
                <Skeleton width={367} height={378} />
              ) : (
                <img
                  style={{ width: 367, height: 378,objectFit:"cover" }}
                  src={product.photo_product}
                  alt="Gambar 1"
                />
              )}
            </div>
            <div className="col-md-8 wrapRight">
              {loading ? (
                <>
                  <Skeleton width={200} height={30} />
                  <div style={{ marginTop: 25 }}>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={100} height={20} />
                  </div>
                </>
              ) : (
                <>
                  <h4>{product.product_name}</h4>
                  <h6 style={{ color: "#9B9B9B" }}>{product.store_name}</h6>
                  <img
                    src={require("../../assets/Rating 5 stars.png")}
                    alt="Gambar 1"
                  />
                </>
              )}
              {loading ? (
                <>
                  <div style={{ marginTop: 25 }}>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={100} height={20} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginTop: 20 }}>
                    <h6>price</h6>
                    <h5 style={{ fontWeight: "bold" }}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </h5>
                  </div>
                </>
              )}
              {loading ? (
                <>
                  <div style={{ marginTop: 20, width: 20 }}>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={300} height={20} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginTop: 20, width: 20 }}>
                    <h6>Color</h6>
                    <div className="wrapColor">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`color ${
                            selectedColor === color ? "selected" : ""
                          }`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {loading ? (
                <>
                  <div style={{ marginTop: 20, width: 20 }}>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={300} height={20} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginTop: 10, width: 20 }}>
                    <h6>Size</h6>
                    <div className="wrapSize">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          className={`size ${
                            selectedSize === size ? "selected" : ""
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="d-flex" style={{ marginTop: 20 }}>
                {loading ? (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <Skeleton width={60} height={20} />
                    </div>
                  </>
                ) : (
                  <>
                    <h6>Jumlah</h6>
                  </>
                )}
              </div>
              <div className="d-flex">
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {loading ? (
                      <>
                        <Skeleton width={60} height={20} />
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={quantity}
                          readOnly
                          style={{
                            width: 50,
                            margin: "0 5px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                      </>
                    )}
                  </div>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex wrapButton" style={{ marginTop: 30 }}>
                <button type="button" className="btn rounded-pill chat">
                  <h6 className="login">Chat</h6>
                </button>
                <button
                  type="button"
                  className="btn rounded-pill bag"
                  onClick={handleaddBag}
                  disabled={!selectedSize || !selectedColor || quantity === 0}
                >
                  <h6 className="login">Add bag</h6>
                </button>
                <Link
                  to={`/cart/${usersId}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button
                    type="button"
                    className="btn rounded-pill buy"
                    onClick={handleBuy}
                    disabled={!selectedSize || !selectedColor || quantity === 0}
                  >
                    <h6 className="login">Buy Now</h6>
                  </button>
                </Link>
              </div>
            </div>
            <h4 style={{ marginTop: 60 }}>Informasi Produk</h4>
            <h6 style={{ marginTop: 30 }}>Condition </h6>
            {loading ? (
              <>
                <Skeleton width={50} height={20} />
              </>
            ) : (
              <h6 style={{ color: "#DB3022" }}>{product.condition}</h6>
            )}
            <h6 style={{ marginTop: 30 }}>Description</h6>
            {loading ? (
              <>
                <Skeleton style={{ width: "100%" }} height={150} />
              </>
            ) : (
              <>
                <p style={{ textAlign: "justify" }}>{product.description}</p>
              </>
            )}
          </div>
        </div>
            <PopularCard />
      </main>
    </>
  );
}

export default DetailProduct;
