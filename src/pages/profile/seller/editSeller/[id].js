import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarSeller from "../../../../components/sidebarSeller";
import NavbarLogin from "../../../../components/navbarLogin";
import Swal from 'sweetalert2';


function EditSeller() {
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [previewImage, setPreviewImage] = useState(data.photo || null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData({
      ...data,
      photo: selectedFile,
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
    formDataToSend.append("store_name", data.store_name);
    formDataToSend.append("email", data.email);
    formDataToSend.append("phone", data.phone);
    formDataToSend.append("store_description", data.store_description);
    formDataToSend.append("photo", data.photo);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_KEY}/seller/${usersId}`,
        formDataToSend
      );
      console.log("update successfully", response);
    } catch (error) {
      console.log("Error update:", error);
    }
  };
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
            {" "}
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold ">My profile store</h5>
              <p>Manage your profile information</p>
              <div style={{ width: 800, border: "1px solid" }}></div>
              <div className="container">
                <div className="row">
                  {/* Bagian Kiri */}
                  <div className="col-lg-8 col-md-4  p-3">
                    <div className=" p-3 text-white">
                      <form>
                        <div className="form-group">
                          <label htmlFor="storeName" className="text-dark">
                            Store Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="storeName"
                            placeholder="Enter store name"
                            onChange={handleChange}
                            name="store_name"
                            value={data.store_name}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email" className="text-dark">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            name="email"
                            value={data.email}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phoneNumber" className="text-dark">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter phone number"
                            onChange={handleChange}
                            name="phone"
                            value={data.phone}
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="storeDescription"
                            className="text-dark"
                          >
                            Store Description
                          </label>
                          <textarea
                            className="form-control"
                            id="storeDescription"
                            rows={4}
                            placeholder="Enter store description"
                            onChange={handleChange}
                            name="store_description"
                            value={data.store_description}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn"
                          onClick={handleSubmit}
                          style={{
                            backgroundColor: "#DB3022",
                            borderRadius: 25,
                            color: "white",
                          }}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* Bagian Kanan */}
                  <div className="col-lg-4  p-3">
                    <div className="p-3 d-flex flex-column align-items-center">
                    <img
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        src={
                          previewImage ||
                          data.photo ||
                          require("../../../../assets/Make Your Day.jpg")
                        }
                        alt="Profile"
                      />

                      <div className="form-group">
                        <label
                          htmlFor="fileInput"
                          className="btn"
                          style={{
                            width: "140px",
                            border: "1px solid",
                            borderRadius: 25,
                            color: "#9B9B9B",
                            marginTop: 20,
                          }}
                        >
                          Select image
                          <input
                            type="file"
                            id="fileInput"
                            className="form-control-file file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            name="photo"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSeller;
