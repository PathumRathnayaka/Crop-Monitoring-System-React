import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CropManagement from './pages/CropManagement';
import StaffManagement from './pages/StaffManagement';
import VehicleManagement from './pages/VehicleManagement';
import FieldManagement from "./pages/FieldManagement.tsx";
import EquipmentManagement from "./pages/equipmentManagement.tsx";
import LogManagement from "./pages/LogManagement.tsx";
function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crops" element={<CropManagement />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/vehicles" element={<VehicleManagement />} />
          <Route path="/fields" element={<FieldManagement />} />
          <Route path="/equipment" element={<EquipmentManagement />} />
          <Route path="/logs" element={<LogManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;