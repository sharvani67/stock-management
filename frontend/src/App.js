
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
import UserDashboard from './SiteUsers/UserDashboard';

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
              <Route path="/summary" element={<StockSummaryTable />}/>

              <Route path="/userdashboard" element={<UserDashboard />}/>
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
