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
    <div>
      <UserNavbar/>
    
    <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <h1 style={{ width: "100%" }}>Dashboard</h1>

      {/* Card for Bar Chart */}
      <div style={cardStyle}>
        <h2>Monthly Stock Overview</h2>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>

      {/* Card for Pie Chart */}
      <div style={cardStyle}>
        <h2>Stock Distribution</h2>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            plugins: { legend: { position: "bottom" } },
          }}
        />
      </div>

      {/* Card for Line Chart */}
      <div style={cardStyle}>
        <h2>Revenue Trends</h2>
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
const cardStyle = {
  width: "300px", // Fixed width for each card
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default UserDashboard;
