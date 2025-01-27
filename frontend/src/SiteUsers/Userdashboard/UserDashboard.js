import React, { useContext } from "react";
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

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  // Data for Product A
  const productAData = {
    labels: ["Stock In", "Stock Out", "Consumed", "Balance"],
    datasets: [
      {
        label: "Product A",
        data: [100, 70, 30, 40],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
      },
    ],
  };

  // Data for Product B
  const productBData = {
    labels: ["Stock In", "Stock Out", "Consumed", "Balance"],
    datasets: [
      {
        label: "Product B",
        data: [80, 50, 20, 30],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
      },
    ],
  };

  // Data for Product C
  const productCData = {
    labels: ["Stock In", "Stock Out", "Consumed", "Balance"],
    datasets: [
      {
        label: "Product C",
        data: [60, 40, 15, 25],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
      },
    ],
  };

  return (

    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
      }}
    >
      <UserNavbar />
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>id: {user?.id}</p>

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

        {/* Card for Product A */}
        <div style={responsiveCardStyle}>
          <h4 style={cardTitleStyle}>Cement</h4>
          <Bar
            data={productAData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              indexAxis: "x", // Vertical bar graph
            }}
          />
        </div>

        {/* Card for Product B */}
        <div style={responsiveCardStyle}>
          <h4 style={cardTitleStyle}>Sand</h4>
          <Bar
            data={productBData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              indexAxis: "x", // Vertical bar graph
            }}
          />
        </div>

        {/* Card for Product C */}
        <div style={responsiveCardStyle}>
          <h4 style={cardTitleStyle}>Steel</h4>
          <Bar
            data={productCData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              indexAxis: "x", // Vertical bar graph
            }}
          />
        </div>
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
