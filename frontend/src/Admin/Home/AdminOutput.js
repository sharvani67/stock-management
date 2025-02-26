import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";

const AdminOutput = () => {
  const { siteId, type } = useParams(); // Get siteId and type from URL params
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let url = "";

    switch (type) {
      case "Purchase":
        url = `${BASE_URL}/api/stockledger/purchase/${siteId}`;
        break;
      case "Consumption":
        url = `${BASE_URL}/api/stockledger/consumption/${siteId}`;
        break;
      case "StockOut":
        url = `${BASE_URL}/api/stockledger/stockout/${siteId}`;
        break;
      case "Allocated":
        url = `${BASE_URL}/api/stockledger/allocated/${siteId}`;
        break;
      default:
        return;
    }

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [siteId, type]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        {type} Details for Site ID: {siteId}
      </h2>

      {loading ? (
        <p className="text-center mt-3">Loading...</p>
      ) : data.length > 0 ? (
        <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Transaction Type</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.transaction_type}</td>
                <td>{item.item_name || "N/A"}</td>
                <td>{item.quantity}</td>
                <td>{item.date || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No data available.</p>
      )}
    </div>
  );
};

export default AdminOutput;
