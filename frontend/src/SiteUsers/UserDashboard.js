import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import UserNavbar from "./Navbar/UserNavbar";

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const UserDashboard = () => {
  // Data for Bar Chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Stock In",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Stock Out",
        data: [8, 15, 5, 6, 9, 4],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  // Data for Pie Chart
  const pieData = {
    labels: ["Sand", "Steel", "Cement", "Aggregates", "Bricks"],
    datasets: [
      {
        label: "Stock Distribution",
        data: [30, 20, 15, 10, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
      },
    ],
  };

  // Data for Line Chart
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [500, 700, 400, 600, 800, 1000],
        borderColor: "rgba(75, 192, 192, 0.7)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
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
        <h1 style={{ width: "100%", textAlign: "center", color: "#333", marginBottom: "20px" }}>Dashboard</h1>

        {/* Card for Bar Chart */}
        <div style={responsiveCardStyle}>
          <h4 style={cardTitleStyle}>Monthly Stock Overview</h4>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>

        {/* Card for Pie Chart */}
        <div style={responsiveCardStyle}>
          <h4 style={cardTitleStyle}>Stock Distribution</h4>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>

        {/* Card for Line Chart */}
        <div style={responsiveCardStyle}>
          <h4 style={cardTitleStyle}>Revenue Trends</h4>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Card style for each chart
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
  flex: "1 1 calc(33.333% - 20px)", // Allows cards to wrap and adjust dynamically
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
