import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';


function ModalUpdate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usersId = localStorage.getItem("usersId");
  const [address, setAddress] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/address/${usersId}`)
      .then((response) => {
        setAddress(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [usersId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_KEY}/address/${address.id}`,
        address
      );
      console.log("Address updated successfully", response);

      handleClose();
    } catch (error) {
      console.log("Error updating address:", error);
    }
  };

  return (
    <>
      <div id="address">
        <button className="btn btn-danger" onClick={handleShow}>
          Change address
        </button>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title style={{ margin: "0 auto", padding: "0" }}>
            Change address
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
                  value={address.address_as}
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
                    value={address.recipient_name}
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
                    value={address.phone}
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
                    value={address.address}
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
                    value={address.postal_code}
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
                    value={address.city}
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
                onClick={handleUpdate}
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

export default ModalUpdate;
