import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserNavbar from "../Navbar/UserNavbar";
import { BASE_URL } from "../../ApiService/Api";
import axios from "axios";

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          brand: item.brand,
          stockIn: item.quantity_in || 0,
          stockOut: 0,
          stockConsumed: 0,
          units: item.units || "",
        }));

        const stockOutData = stockOutResponse.data.map((item) => ({
          product: item.product,
          brand: item.brand,
          stockIn: 0,
          stockOut: item.quantity_out || 0,
          stockConsumed: 0,
          units: item.units || "",
        }));

        const stockConsumedData = stockConsumedResponse.data.map((item) => ({
          product: item.product,
          brand: item.brand,
          stockIn: 0,
          stockOut: 0,
          stockConsumed: item.quantity_out || 0, // Assuming stock consumption is recorded under quantity_out
          units: item.units || "",
        }));

        const allocations = allocatedStock.map((item) => ({
          product: item.product,
          brand: item.brand,
          stockIn: item.quantity_out || 0,
          stockOut: 0,
          stockConsumed: 0,
          units: item.units || "",
        }));

        // Merge & Aggregate Data
        const mergedData = [...stockInData, ...stockOutData, ...stockConsumedData, ...allocations];

        const groupedStock = mergedData.reduce((acc, item) => {
          const key = `${item.product}-${item.brand}`; // Unique key for grouping

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

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
      }}
    >
      <UserNavbar />
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Dashboard
        </h1>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          stockData.map((item) => (
            <div key={`${item.product}-${item.brand}`} style={responsiveCardStyle}>
              <h4 style={cardTitleStyle}>{item.product} - {item.brand}</h4>
              <Bar
                data={{
                  labels: ["Stock In", "Stock Out", "Consumed", "Remaining Stock"],
                  datasets: [
                    {
                      label: item.product,
                      data: [
                        item.stockIn,
                        item.stockOut,
                        item.stockConsumed,
                        item.remainingStock,
                      ],
                      backgroundColor: [
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(255, 99, 132, 0.7)",
                        "rgba(255, 206, 86, 0.7)",
                        "rgba(75, 192, 192, 0.7)",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  indexAxis: "x", // Vertical bar graph
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Card style for the charts
const responsiveCardStyle = {
  width: "100%", // Full width for mobile
  maxWidth: "350px", // Limit width for larger screens
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #e0e0e0",
  boxSizing: "border-box",
};

// Card title style
const cardTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#555",
  marginBottom: "15px",
  textAlign: "center",
};

export default UserDashboard;