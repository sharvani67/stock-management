import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from "../../ApiService/Api";

const BASEURL = `${BASE_URL}/uploads/`; // Adjust this based on your backend setup
const ViewStockConsumed = ({ show, handleClose, stockConsumedData }) => {
  if (!stockConsumedData) return null;

  console.log("ViewStockConsumed Data:", stockConsumedData); // Debug log

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Stock Consumed Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered striped>
          <tbody>
            <tr>
              <th>Date & Time</th>
              <td>{stockConsumedData.date || "N/A"}</td>
            </tr>
            <tr>
              <th>Product Name</th>
              <td>{stockConsumedData.product || "N/A"}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{stockConsumedData.quantity_out || "N/A"}</td>
            </tr>
            <tr>
              <th>Units</th>
              <td>{stockConsumedData.units || "N/A"}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{stockConsumedData.description || "N/A"}</td>
            </tr>
            <tr>
              <th>Attachment</th>
              <td>
                {stockConsumedData.attachment ? (
                  <a
                    href={`${BASEURL}${stockConsumedData.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`${BASEURL}${stockConsumedData.attachment}`}
                      alt="Attachment"
                      style={{
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                ) : (
                  "No Attachment"
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewStockConsumed;
