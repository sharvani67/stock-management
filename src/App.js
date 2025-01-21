import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import AddPurchaseForm from './Components/Purchase/AddPurchase';
import TablePurchase from './Components/Purchase/TablePurchase';
import SiteTable from './Components/Sites/TableSite';
import Table from './Components/User/TableUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSiteForm from './Components/Sites/AddSite';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
