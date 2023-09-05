import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';


function ModalCreate() {
  const usersId = localStorage.getItem("usersId");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    recipient_name: "",
    address_as: "",
    address: "",
    phone: "",
    postal_code: "",
    city: "",
    users_id: usersId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/address`, data);
      console.log("Address create successfully", response);
      handleClose();
    } catch (error) {
      console.log("Error create address:", error);
    }
  };

  return (
    <>
      <div id="address">
        <div
          onClick={handleShow}
          className="addressNew"
          style={{
            maxWidth: "100%",
            width: "710px",
            height: "86px",
            border: "1px dashed #9B9B9B",
            borderRadius: "8px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            padding: "0",
          }}
        >
          <h6 style={{ color: "#9B9B9B" }}>Add new address</h6>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title style={{ margin: "0 auto", padding: "0" }}>
            Choose another address
          </Modal.Title>
          <Modal.Body style={{ height: 500 }}>
            <form>
              <div className="form-group">
                <label className="text-secondary" htmlFor="inputAddress">
                  Save address as (ex : home address, office address)
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputAddress"
                  placeholder="Rumah"
                  name="address_as"
                  value={data.address_as}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputRecipients">
                    Recipient’s name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRecipients"
                    name="recipient_name"
                    value={data.recipient_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputphone">
                    Recipient's telephone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputphone"
                    name="phone"
                    value={data.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputAddress">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    name="address"
                    value={data.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputPostal">
                    Postal code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPostal"
                    name="postal_code"
                    value={data.postal_code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputCity">
                    City or Subdistrict
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    name="city"
                    value={data.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label
                    className="form-check-label text-secondary"
                    htmlFor="gridCheck"
                  >
                    Make it the primary address
                  </label>
                </div>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                className="btn"
                style={{
                  width: 160,
                  height: 36,
                  border: "1px solid #9B9B9B",
                  color: "#9B9B9B",
                  borderRadius: "24px",
                  marginRight: "10px",
                }}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  width: 160,
                  height: 36,
                  borderRadius: "24px",
                  backgroundColor: "#DB3022",
                  color: "white",
                }}
                onClick={handleCreate}
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalCreate;
