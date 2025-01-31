import React, { useMemo, useState, useEffect, useContext } from "react";
import DataTable from "../../layout/DataTable";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api"; // Ensure BASE_URL is correctly set

const StockSummaryTable = () => {
  const { user } = useContext(AuthContext);
  const [stockData, setStockData] = useState([]); // State to store combined stock data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!user?.id) return; // Ensure user is available

      try {
        setLoading(true);

        // Fetch stock-in data
        const stockInResponse = await axios.get(`${BASE_URL}/stock-in`, {
          params: { userid: user.id },
        });

        // Fetch allocated (stock out) data
        const allocatedStockResponse = await axios.get(`${BASE_URL}/allocated`);

        const stockInData = stockInResponse.data || [];
        const allocatedStockData = allocatedStockResponse.data || [];

        // Merge unique products, brands, and units
        const combinedData = {};

        [...stockInData, ...allocatedStockData].forEach((item) => {
          const key = `${item.product}-${item.brand}-${item.units}`; // Unique key

          if (!combinedData[key]) {
            combinedData[key] = {
              productName: item.product,
              brandName: item.brand,
              units: item.units,
              stockIn: 0,
              stockOut: 0,
              remainingStock: 0,
            };
          }

          // Add stock-in and stock-out quantities
          if (item.quantity_in) {
            combinedData[key].stockIn += item.quantity_in;
          }
          if (item.quantity_out) {
            combinedData[key].stockOut += item.quantity_out;
          }

          // Calculate remaining stock
          combinedData[key].remainingStock = combinedData[key].stockIn - combinedData[key].stockOut;
        });

        // Convert object to array
        setStockData(Object.values(combinedData));
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [user?.id]);

  // Define table columns
  const columns = useMemo(
    () => [
      { Header: "Product Name", accessor: "productName" },
      { Header: "Brand Name", accessor: "brandName" },
      { Header: "Units", accessor: "units" },
      { Header: "Stock In", accessor: "stockIn" },
      { Header: "Stock Out", accessor: "stockOut" },
      { Header: "Remaining Stock", accessor: "remainingStock" },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">Stock Summary</h1>
        {loading ? <p>Loading data...</p> : <DataTable columns={columns} data={stockData} />}
      </div>
    </div>
  );
};

export default StockSummaryTable;
