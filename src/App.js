// Packages Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Compponents Imports
import TollList from "./pages/TollList";
import VehicleList from "./pages/VehicleList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<VehicleList />} />
        <Route path='toll-list' element={<TollList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
