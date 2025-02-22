import React, { useEffect, useState, useContext } from "react";
import DataTable from "../../layout/DataTable";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";


const StockSummary = () => {
  const { user } = useContext(AuthContext);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        // Fetch user's sites to determine the receiver site
        const siteResponse = await axios.get(`${BASE_URL}/sites`, {
          params: { userId: user.id },
        });
        const userSites = siteResponse.data.filter((site) => site.userId === user?.id);

        if (userSites.length === 0) {
          console.error("No sites found for the user");
          setLoading(false);
          return;
        }

        const site = userSites[0];
        setSelectedSite(site);

        // Fetch stock-in (purchased) products
        const stockInResponse = await axios.get(`${BASE_URL}/stock-in`, {
          params: { userid: user.id },
        });

        // Fetch stock-out (issued) products
        const stockOutResponse = await axios.get(`${BASE_URL}/stock-out`, {
          params: { userid: user.id },
        });

        // Fetch stock consumed products
        const stockConsumedResponse = await axios.get(`${BASE_URL}/stock-consumed`, {
          params: { userid: user.id },
        });

        // Fetch allocated (stock-out) products
        const allocatedResponse = await axios.get(`${BASE_URL}/allocated`);
        const allocatedStock = allocatedResponse.data.filter(
          (record) => record.receiver === site.siteName
        );

        // Convert data structure for uniformity
        const stockInData = stockInResponse.data.map((item) => ({
          product: item.product,
          
          stockIn: item.quantity_in || 0,
          stockOut: 0,
          stockConsumed: 0,
          units: item.units || "",
        }));

        const stockOutData = stockOutResponse.data.map((item) => ({
          product: item.product,
          
          stockIn: 0,
          stockOut: item.quantity_out || 0,
          stockConsumed: 0,
          units: item.units || "",
        }));

        const stockConsumedData = stockConsumedResponse.data.map((item) => ({
          product: item.product,
          
          stockIn: 0,
          stockOut: 0,
          stockConsumed: item.quantity_out || 0, // Assuming stock consumption is recorded under quantity_out
          units: item.units || "",
        }));

        const allocations = allocatedStock.map((item) => ({
          product: item.product,
          
          stockIn: item.quantity_out || 0,
          stockOut: 0,
          stockConsumed: 0,
          units: item.units || "",
        }));

        // Merge & Aggregate Data
        const mergedData = [...stockInData, ...stockOutData, ...stockConsumedData, ...allocations];

        const groupedStock = mergedData.reduce((acc, item) => {
          const key = `${item.product}`// Unique key for grouping

          if (!acc[key]) {
            acc[key] = { ...item, remainingStock: item.stockIn - (item.stockOut + item.stockConsumed) };
          } else {
            acc[key].stockIn += item.stockIn;
            acc[key].stockOut += item.stockOut;
            acc[key].stockConsumed += item.stockConsumed;
            acc[key].remainingStock = acc[key].stockIn - (acc[key].stockOut + acc[key].stockConsumed);
          }

          return acc;
        }, {});

        // Convert object back to array
        setStockData(Object.values(groupedStock));
      } catch (error) {
        console.error("Error fetching stock summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [user?.id]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Summary Report", 14, 10);

    const tableColumn = ["Product Name", "Stock In", "Units", "Stock Out", "Stock Consumed", "Remaining Stock"];
    const tableRows = stockData.map((row) => [
      row.product,
      row.stockIn,
      row.units,
      row.stockOut,
      row.stockConsumed,
      row.remainingStock,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Stock_Summary.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(stockData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Summary");
    XLSX.writeFile(workbook, "Stock_Summary.xlsx");
  };

  // Define table columns
  const columns = [
    { Header: "Product Name", accessor: "product" },
    { Header: "Stock In", accessor: "stockIn" },
    { Header: "Units", accessor: "units" },
    { Header: "Stock Out", accessor: "stockOut" },
    { Header: "Stock Consumed", accessor: "stockConsumed" },
    { Header: "Remaining Stock", accessor: "remainingStock" },
  ];

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">Stock Summary</h1>
        <div className="mb-3">
          <button className="btn btn-primary me-2" onClick={exportToPDF}>Export as PDF</button>
          <button className="btn btn-success" onClick={exportToExcel}>Export as Excel</button>
        </div>
        {loading ? <p>Loading data...</p> : <DataTable columns={columns} data={stockData} />}
      </div>
    </div>
  );
};

export default StockSummary;
