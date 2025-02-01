import React, { useEffect, useState, useContext } from "react";
import DataTable from "../../layout/DataTable";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";

const StockSummary = () => {
  const { user } = useContext(AuthContext);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!user?.id) return; // Ensure user ID is available

      try {
        setLoading(true);

        // Fetch user's sites to determine the receiver site
        const siteResponse = await axios.get(`${BASE_URL}/sites`, { params: { userId: user.id } });
        const userSites = siteResponse.data.filter(site => site.userId === user?.id);

        if (userSites.length === 0) {
          console.error("No sites found for the user");
          return;
        }

        const site = userSites[0]; // Select the first site
        setSelectedSite(site);

        // Fetch stock-in (purchased) products
        const purchaseResponse = await axios.get(`${BASE_URL}/stock-in`, { params: { userid: user.id } });

        // Fetch allocated (stock-out) products
        const allocatedResponse = await axios.get(`${BASE_URL}/allocated`);
        const allocatedStock = allocatedResponse.data.filter(record => record.receiver === site.siteName);

        // Convert data structure for uniformity
        const purchases = purchaseResponse.data.map(item => ({
          product: item.product,
          brand: item.brand,
          units: item.units,
          stockIn: item.quantity || 0, // Assuming `quantity` represents stock-in
          stockOut: 0, // Since this is purchase data
        }));

        const allocations = allocatedStock.map(item => ({
          product: item.product,
          brand: item.brand,
          units: item.units,
          stockIn: 0, // Since this is allocated (stock-out) data
          stockOut: item.quantity || 0, // Assuming `quantity` represents stock-out
        }));

        // Merge & Aggregate Data
        const mergedData = [...purchases, ...allocations];

        const groupedStock = mergedData.reduce((acc, item) => {
          const key = `${item.product}-${item.brand}`; // Unique key for grouping

          if (!acc[key]) {
            acc[key] = { ...item, remainingStock: item.stockIn - item.stockOut };
          } else {
            acc[key].stockIn += item.stockIn;
            acc[key].stockOut += item.stockOut;
            acc[key].remainingStock = acc[key].stockIn - acc[key].stockOut;
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

  // Define table columns
  const columns = [
    { Header: "Product Name", accessor: "product" },
    { Header: "Brand Name", accessor: "brand" },
    { Header: "Units", accessor: "units" },
    { Header: "Stock In", accessor: "stockIn" },
    { Header: "Stock Out", accessor: "stockOut" },
    { Header: "Remaining Stock", accessor: "remainingStock" },
  ];

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

export default StockSummary;
