import React from 'react';
import { Modal, Button, Table } from "react-bootstrap";

const ViewStockIn = ({ show, handleClose, stockInData }) => {
  if (!stockInData) return null; // Prevents rendering if there's no data

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header className="bg-primary text-white" closeButton>
        <Modal.Title>View Stock-In Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered striped>
          <tbody>
            <tr>
              <th>Date & Time</th>
              <td>{stockInData.date || "N/A"}</td>
            </tr>
            <tr>
              <th>Bill Number</th>
              <td>{stockInData.invoice_no || "N/A"}</td>
            </tr>
            <tr>
              <th>Product Name</th>
              <td>{stockInData.product || "N/A"}</td>
            </tr>
            <tr>
              <th>Supplier Name</th>
              <td>{stockInData.supplier || "N/A"}</td>
            </tr>
            <tr>
              <th>Unit Name</th>
              <td>{stockInData.units || "N/A"}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{stockInData.price ? `$${stockInData.price}` : "N/A"}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{stockInData.quantity_in || "N/A"}</td>
            </tr>
            <tr>
              <th>Total Price</th>
              <td>{stockInData.total_price ? `$${stockInData.total_price}` : "N/A"}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{stockInData.description || "N/A"}</td>
            </tr>
            <tr>
              <th>Attachment</th>
              <td>
                {stockInData.attachment ? (
                  <a href={stockInData.attachment} target="_blank" rel="noopener noreferrer">
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

export default ViewStockIn;
