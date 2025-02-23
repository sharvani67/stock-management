import './App.css';
import AllocationTable from './Components/Allocation/Allocation';
import CentralStockTable from './Components/CentralStock/CentralStock';
import UnitTable from './Components/Units/Units';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import AddPurchaseForm from './Components/Purchase/AddPurchase';
import TablePurchase from './Components/Purchase/TablePurchase';
import SiteTable from './Components/Sites/Site';
import Table from './Components/User/TableUser';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductTable from './Components/Products/Products';
import Brand from './Components/Brands/Brands';
import SupplierTable from './Components/Suppliers/Supplier';
import Sidebar from './Shared/SideBar/SideBar';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import StockInForm from './SiteUsers/StockIn/StockInForm';
import StockInTable from './SiteUsers/StockIn/StockInTable';
import UserNavbar from './SiteUsers/Navbar/UserNavbar';
import StockOutTable from './SiteUsers/StockOut/StockOutTable';
import StockConsumedTable from './SiteUsers/StockConsumed/StockConsumedTable';
import StockSummaryTable from './SiteUsers/Reports/ReportsTable';
import UserDashboard from './SiteUsers/Userdashboard/UserDashboard';
import AllocatedStock from './SiteUsers/AllocatedTable';
import Home from './SiteUsers/Home/Home'; // ✅ Fixed Import (Ensure File is Named Home.js)
import AdminHome from './Admin/Home/AdminHome';
import AdminOutput from './Admin/Home/AdminOutput';
import AdminPurchase from './Admin/Home/AdminPurchase';
import AdminConsumption from './Admin/Home/AdminConsumption';
import AdminStockout from './Admin/Home/AdminStockout';
import AdminAllocated from './Admin/Home/AdminAllocated';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="d-flex" id="wrapper">
          {/* <Sidebar /> */}

          {/* Main content */}
          <div id="page-content-wrapper" className="w-100">
            <Routes>
              <Route path="/users" element={<Table />} />
              <Route path="/purchase" element={<TablePurchase />} />
              <Route path="/add-purchase" element={<AddPurchaseForm />} />
              <Route path="/site" element={<SiteTable />} />
              <Route path="/products" element={<ProductTable />} />
              <Route path="/brands" element={<Brand />} />
              <Route path="/unit" element={<UnitTable />} />
              <Route path="/allocations" element={<AllocationTable />} />
              <Route path="/centralstock" element={<CentralStockTable />} />
              <Route path="/suppliers" element={<SupplierTable />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/stockin" element={<StockInForm />} />
              <Route path="/stockintable" element={<StockInTable />} />
              <Route path="/stockout" element={<StockOutTable />} />
              <Route path="/stockconsumed" element={<StockConsumedTable />} />
              <Route path="/summary" element={<StockSummaryTable />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/allocatedtable" element={<AllocatedStock />} />
              <Route path="/home" element={<Home />}/>
              <Route path="/adminhome" element={<AdminHome />} /> {/* ✅ Fixed Routing */}
              {/* <Route path="/admin-output/:siteId/:type" element={<AdminOutput />} /> */}
              {/* Individual Routes for Transactions */}
        <Route path="/admin-output/:siteId/Purchase" element={<AdminPurchase />} />
        <Route path="/admin-output/:siteId/Consumption" element={<AdminConsumption/>} />
        <Route path="/admin-output/:siteId/StockOut" element={<AdminStockout />} />
        <Route path="/admin-output/:siteId/Allocated" element={<AdminAllocated />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
