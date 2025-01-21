import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const TablePurchase = () => {
  const data = [
    { sNo: 1, stockName: 'Product A', quantity: 100, units: 'pcs', price: 10, supplierName: 'Supplier X', brandName: 'Brand Y' },
    { sNo: 2, stockName: 'Product B', quantity: 150, units: 'pcs', price: 20, supplierName: 'Supplier Y', brandName: 'Brand Z' },
    { sNo: 3, stockName: 'Product C', quantity: 200, units: 'pcs', price: 30, supplierName: 'Supplier Z', brandName: 'Brand X' },
    { sNo: 4, stockName: 'Product D', quantity: 50, units: 'pcs', price: 40, supplierName: 'Supplier W', brandName: 'Brand Y' },
    { sNo: 5, stockName: 'Product E', quantity: 300, units: 'pcs', price: 50, supplierName: 'Supplier V', brandName: 'Brand Z' },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Purchase</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>S.No</th>
              <th>Stock Name</th>
              <th>Quantity</th>
              <th>Units</th>
              <th>Price</th>
              <th>Supplier Name</th>
              <th>Brand Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.sNo}>
                <td>{item.sNo}</td>
                <td>{item.stockName}</td>
                <td>{item.quantity}</td>
                <td>{item.units}</td>
                <td>{item.price}</td>
                <td>{item.supplierName}</td>
                <td>{item.brandName}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Button variant="info" size="sm" title="View">
                      <FaEye />
                    </Button>
                    <Button variant="warning" size="sm" title="Edit">
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm" title="Delete">
                      <FaTrashAlt />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePurchase;
