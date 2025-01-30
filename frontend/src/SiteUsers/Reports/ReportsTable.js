import React, { useMemo, useState, useEffect, useContext } from "react";
import DataTable from "../../layout/DataTable";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api"; // Assuming BASE_URL is set correctly

const StockSummaryTable = () => {
  const { user, logout } = useContext(AuthContext);
  const [stockData, setStockData] = useState([]); // State to store stock data
  const [siteId, setSiteId] = useState("1"); // Assume siteId is available or set it dynamically

  // Fetch stock data dynamically
  useEffect(() => {
    const fetchStockData = async () => {
      if (!user?.id || !siteId) return;

      try {
        // Fetch stock-in data
        const stockInResponse = await axios.get(`${BASE_URL}/stock-in`, {
          params: { userid: user.id, siteid: siteId },
        });

        // Fetch stock-out data
        const stockOutResponse = await axios.get(`${BASE_URL}/stock-out`, {
          params: { userid: user.id, siteid: siteId },
        });

        // Fetch stock-consumed data
        const stockConsumedResponse = await axios.get(`${BASE_URL}/stock-consumed`, {
          params: { userid: user.id, siteid: siteId },
        });

        // Process the stock data
        if (
          stockInResponse.status === 200 &&
          stockOutResponse.status === 200 &&
          stockConsumedResponse.status === 200
        ) {
          const stockInData = stockInResponse.data;
          const stockOutData = stockOutResponse.data;
          const stockConsumedData = stockConsumedResponse.data;

          // Combine data into one list
          const data = [...stockInData, ...stockOutData, ...stockConsumedData].map((item) => ({
            date: item.date,
            productName: item.product,
            brandName: item.brand,
            stockIn: item.quantity_in || 0,
            stockOut: item.quantity_out || 0,
            consumed: item.quantity_out || 0, // assuming consumed uses quantity_out field
            remainingStock: (item.quantity_in || 0) - (item.quantity_out || 0) - (item.quantity_out || 0),
          }));

          setStockData(data); // Update state with combined data
        } else {
          console.error("Failed to fetch stock data");
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [user?.id, siteId]);

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Brand Name",
        accessor: "brandName",
      },
      {
        Header: "Stock In",
        accessor: "stockIn",
      },
      {
        Header: "Stock Out",
        accessor: "stockOut",
      },
      {
        Header: "Consumed",
        accessor: "consumed",
      },
      {
        Header: "Remaining Stock",
        accessor: "remainingStock",
      },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />

      <div className="container mt-4">
        <h1 className="mb-4">Stock Summary</h1>
        <DataTable columns={columns} data={stockData} />
      </div>
    </div>
  );
};

export default StockSummaryTable;
