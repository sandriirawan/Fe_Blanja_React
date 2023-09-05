import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarLogin from "../../../../../components/navbarLogin";
import SidebarSeller from "../../../../../components/sidebarSeller";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';



function EditProduct() {
  const { id } = useParams(); 
  const [dataCategory, setDataCategory] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/product/${id}`)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setData({
      ...data,
      category_id: selectedCategoryId,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData({
      ...data,
      photo_product: selectedFile,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("product_name", data.product_name);
    formDataToSend.append("color", data.color);
    formDataToSend.append("size", data.size);
    formDataToSend.append("stock", data.stock);
    formDataToSend.append("price", data.price);
    formDataToSend.append("condition", data.condition);
    formDataToSend.append("description", data.description);
    formDataToSend.append("category_id", data.category_id);
    formDataToSend.append("photo_product", data.photo_product);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_KEY}/product/${id}`,
        formDataToSend
      );
      Swal.fire({
        icon: 'success',
        title: 'update product successfully',
      });
      console.log("update product successfully", response);
    } catch (error) {
      console.log("Error creating update:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/category`)
      .then((response) => {
        setDataCategory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <NavbarLogin/>
      <main id="createProduct">
        <div style={{ display: "flex" }}>
        <SidebarSeller/>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "1245px",
              height: "1563px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <div
              className="card"
              style={{ width: 850, height: 1300, backgroundColor: "white" }}
            >
              <div style={{ padding: 30 }}>
                <h5 className="font-weight-bold mb-3">Update Product</h5>
                <div style={{ width: 800, border: "1px solid" }}></div>
                <div className="container p-3">
                  <form>
                    <div
                      className="wrapImage"
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="preview"
                        />
                      ) : (
                        <img
                        src={data.photo_product}
                        alt="Preview"
                        className="preview"
                      />
                      )}

                      <div className="form-group">
                        <label htmlFor="fileInput" className="btn btnUpload">
                          Upload Photo
                          <input
                            type="file"
                            id="fileInput"
                            className="form-control-file file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            name="photo_product"
                          />
                        </label>
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <div className="form-group mr-3">
                        <label htmlFor="productname" className="text-secondary">
                          product name
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="productname"
                          placeholder="Enter product name"
                          name="product_name"
                          value={data.product_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price" className="text-secondary">
                          price
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="price"
                          placeholder="Enter price"
                          name="price"
                          value={data.price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <div className="form-group mr-3">
                        <label htmlFor="size" className="text-secondary">
                          stock size
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="size"
                          placeholder="Example s,m,l,xl or 27,28,29"
                          name="size"
                          value={data.size}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="color" className="text-secondary">
                          stock color
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="color"
                          placeholder="Example black,green"
                          name="color"
                          value={data.color}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <div className="form-group mr-3">
                        <label htmlFor="stock" className="text-secondary">
                          Stock product
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="stock"
                          placeholder="Enter stock quantity"
                          name="stock"
                          value={data.stock}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="condition" className="text-secondary">
                          condition product
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="condition"
                          placeholder="Enter condition"
                          name="condition"
                          value={data.condition}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        className="form-control input"
                        id="category"
                        name="category_id"
                        value={data.category_id}
                        onChange={handleCategoryChange}
                      >
                        {dataCategory.map((item) => (
                          <option value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="Description" className="text-secondary">
                        Description
                      </label>
                      <textarea
                        className="form-control description "
                        id="Description"
                        rows={4}
                        placeholder="Enter description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn mt-4"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: "#DB3022",
                        borderRadius: 25,
                        color: "white",
                        width: 200,
                        height: 48,
                      }}
                    >
                      <span className="font-weight-bold ">update</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditProduct;
