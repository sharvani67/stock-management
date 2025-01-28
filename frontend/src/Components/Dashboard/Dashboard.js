import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUsers, FaBox, FaBuilding, FaTruck, FaChartBar, FaMoneyBillWave } from "react-icons/fa"; // Import icons
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/Dashboard.css'; // Optional CSS for additional styles
import Sidebar from '../../Shared/SideBar/SideBar';

const Dashboard = () => {
  const stats = [
    { title: "Total Users", count: 22, icon: <FaUsers />, bgColor: " #81BFDA" },
    { title: "Total Products", count: 8, icon: <FaBox />, bgColor: " #A7D477" },
    { title: "Total Sites", count: 13, icon: <FaBuilding />, bgColor: " #E7CCCC" },
    { title: "Total Suppliers", count: 5, icon: <FaTruck />, bgColor: " #17a2b8" },
    { title: "Analytics", count: "-", icon: <FaChartBar />, bgColor: " #6f42c1" },
    { title: "Total Expenditure", count: "₹ 15,000", icon: <FaMoneyBillWave />, bgColor: " #dc3545" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Container className="mt-5">
          <h2 className="text-center mb-4">Dashboard</h2>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={6} lg={4} key={index}>
                <Card
                  className="text-white shadow-sm dashboard-card"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Card.Body className="d-flex align-items-center">
                    <div
                      className="icon-container"
                      style={{ fontSize: "2.5rem", marginRight: "1.5rem" }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <h5 className="mb-1">{stat.title}</h5>
                      <h3 className="mb-0">{stat.count}</h3>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
