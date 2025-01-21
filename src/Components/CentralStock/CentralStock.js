import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CentralStockTable = () => {
  const [data] = useState([
    { stockSummary: "Category 1", brandName: "Brand A", qtyIn: 100, qtyOut: 40, remaining: 60 },
    { stockSummary: "Category 2", brandName: "Brand B", qtyIn: 200, qtyOut: 70, remaining: 130 },
    { stockSummary: "Category 3", brandName: "Brand C", qtyIn: 150, qtyOut: 50, remaining: 100 },
  ]);

  return (
    <div className="container mt-4">
      <h2>Stock Summary Table</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Stock Summary</th>
              <th>Brand Name</th>
              <th>Qty In</th>
              <th>Qty Out</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.stockSummary}</td>
                <td>{item.brandName}</td>
                <td>{item.qtyIn}</td>
                <td>{item.qtyOut}</td>
                <td>{item.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CentralStockTable;
