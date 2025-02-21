import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewStockout = ({ show, handleClose, stockoutData }) => {
  if (!stockoutData) return null; // Prevents rendering if there's no data

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Stock-Out Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered striped>
          <tbody>
            <tr>
              <th>Date</th>
              <td>{stockoutData.date || "N/A"}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{stockoutData.time || "N/A"}</td>
            </tr>
            <tr>
              <th>Destination Site</th>
              <td>{stockoutData.receiver || "N/A"}</td>
            </tr>
            <tr>
              <th>Product Name</th>
              <td>{stockoutData.product || "N/A"}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{stockoutData.quantity_out || "N/A"}</td>
            </tr>
            <tr>
              <th>Units</th>
              <td>{stockoutData.units || "N/A"}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{stockoutData.description || "N/A"}</td>
            </tr>
            <tr>
              <th>Attachment</th>
              <td>
                {stockoutData.attachment ? (
                  <a href={stockoutData.attachment} target="_blank" rel="noopener noreferrer">
                    View Attachment
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

export default ViewStockout;
