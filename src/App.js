
import './App.css';
import AllocationTable from './Components/Allocation/Allocation';
import CentralStockTable from './Components/CentralStock/CentralStock';
import UnitTable from './Components/Units/Units';


function App() {
  return (
    <div className="App">
      <UnitTable />
      <AllocationTable />
      <CentralStockTable />
      
        
    </div>
  );
}

export default App;
