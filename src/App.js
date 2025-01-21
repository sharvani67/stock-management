
import './App.css';
import AllocationTable from './Components/Allocation/Allocation';
import CentralStockTable from './Components/CentralStock/CentralStock';
import UnitTable from './Components/Units/Units';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import AddPurchaseForm from './Components/Purchase/AddPurchase';
import TablePurchase from './Components/Purchase/TablePurchase';
import SiteTable from './Components/Sites/TableSite';
import Table from './Components/User/TableUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSiteForm from './Components/Sites/AddSite';
import Supplier from './Components/Suppliers/Supplier';

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
          <Route path="/unit" element={<UnitTable />} />
          <Route path="/allocations" element={<AllocationTable />} />
          <Route path="/centralstock" element={<CentralStockTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
