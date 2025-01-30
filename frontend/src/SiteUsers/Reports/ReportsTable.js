import React, { useEffect, useMemo, useState, useContext } from "react";
import DataTable from "../../layout/DataTable";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

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
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
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
