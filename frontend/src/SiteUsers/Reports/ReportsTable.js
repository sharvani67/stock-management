<<<<<<< HEAD
import React, { useEffect, useMemo, useState, useContext } from "react";
=======
import React, { useMemo, useState, useEffect, useContext } from "react";
>>>>>>> ff7a70e253979a8e77eb4044b62fca627fd81386
import DataTable from "../../layout/DataTable";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
<<<<<<< HEAD

const StockSummaryTable = () => {
  const { user } = useContext(AuthContext);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchStockData = async () => {
      try {
        const [stockInRes, stockOutRes, consumedRes] = await Promise.all([
          axios.get(`/stock-in?userid=${user.id}`),
          axios.get(`/stock-out?userid=${user.id}`),
          axios.get(`/stock-consumed?userid=${user.id}`)
        ]);

        const stockInData = stockInRes.data;
        const stockOutData = stockOutRes.data;
        const consumedData = consumedRes.data;

        // Aggregate data
        const stockSummary = {};

        stockInData.forEach(entry => {
          const key = `${entry.date}-${entry.productName}-${entry.brandName}`;
          stockSummary[key] = {
            date: entry.date,
            productName: entry.productName,
            brandName: entry.brandName,
            stockIn: (stockSummary[key]?.stockIn || 0) + entry.quantity,
            stockOut: 0,
            consumed: 0,
            remainingStock: (stockSummary[key]?.remainingStock || 0) + entry.quantity,
          };
        });

        stockOutData.forEach(entry => {
          const key = `${entry.date}-${entry.productName}-${entry.brandName}`;
          if (stockSummary[key]) {
            stockSummary[key].stockOut += entry.quantity;
            stockSummary[key].remainingStock -= entry.quantity;
          }
        });

        consumedData.forEach(entry => {
          const key = `${entry.date}-${entry.productName}-${entry.brandName}`;
          if (stockSummary[key]) {
            stockSummary[key].consumed += entry.quantity;
            stockSummary[key].remainingStock -= entry.quantity;
          }
        });

        setStockData(Object.values(stockSummary));
=======
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
>>>>>>> ff7a70e253979a8e77eb4044b62fca627fd81386
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
<<<<<<< HEAD
  }, [user]);

  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Product Name", accessor: "productName" },
      { Header: "Brand Name", accessor: "brandName" },
      { Header: "Stock In", accessor: "stockIn" },
      { Header: "Stock Out", accessor: "stockOut" },
      { Header: "Consumed", accessor: "consumed" },
      { Header: "Remaining Stock", accessor: "remainingStock" },
=======
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
>>>>>>> ff7a70e253979a8e77eb4044b62fca627fd81386
    ],
    []
  );

  return (
    <div>
      <UserNavbar />
<<<<<<< HEAD
=======

>>>>>>> ff7a70e253979a8e77eb4044b62fca627fd81386
      <div className="container mt-4">
        <h1 className="mb-4">Stock Summary</h1>
        <DataTable columns={columns} data={stockData} />
      </div>
    </div>
  );
};

export default StockSummaryTable;
