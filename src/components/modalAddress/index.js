import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalCreate from "../modalCreateAddress";
import ModalUpdate from "../modalUpdateAddress";
import axios from "axios";

function ModalAddress() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usersId = localStorage.getItem("usersId");
  const [address, setAddress] = useState([]);

  const fetchAddressData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/address/${usersId}`)
      .then((response) => {
        setAddress(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchAddressData();
    const intervalId = setInterval(fetchAddressData, 5000);
    return () => clearInterval(intervalId);
  }, [usersId]);

  return (
    <>
      <div id="address">
        <button className="btn address" onClick={handleShow}>
          Choose another address
        </button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title style={{ margin: "0 auto", padding: "0" }}>
            Choose another address
          </Modal.Title>
          <Modal.Body style={{ height: 400 }}>
            <ModalCreate />
            {address ? (
              <div
                className="addressNew mt-4"
                style={{
                  maxWidth: "100%",
                  width: "710px",
                  height: "210px",
                  border: "1px solid #DB3022",
                  borderRadius: "8px",
                  margin: "0 auto",
                  padding: "0",
                }}
              >
                <div className="m-3">
                  <h6>{address.recipient_name}</h6>
                  <span>{address.phone}</span>
                  <p style={{ maxWidth: "100%", height: 58 }}>
                    {address.address_as}, {address.address}, {address.city},{" "}
                    {address.postal_code}
                  </p>
                  <ModalUpdate />
                </div>
              </div>
            ) : (
              <div
                className="addressNew mt-4"
                style={{
                  maxWidth: "100%",
                  width: "710px",
                  height: "210px",
                  border: "1px solid #DB3022",
                  borderRadius: "8px",
                  margin: "0 auto",
                  padding: "0",
                }}
              >
                <h6 className="m-3">No address.</h6>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalAddress;
