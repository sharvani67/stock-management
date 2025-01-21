import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import AddPurchaseForm from './Components/Purchase/AddPurchase';
import TablePurchase from './Components/Purchase/TablePurchase';
import SiteTable from './Components/Sites/TableSite';
import Table from './Components/User/TableUser';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSiteForm from './Components/Sites/AddSite';
import Supplier from './Components/Suppliers/Supplier';
import ProductTable from './Components/Products/Products';
import Brand from './Components/Brands/Brands';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define routes for different components */}
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/purchase" element={<TablePurchase />} />
          <Route path="/add-purchase" element={<AddPurchaseForm />} />
          <Route path="/site" element={<SiteTable />} />
          <Route path="/add-site" element={<AddSiteForm />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/brands" element={<Brand />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
