import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '../src/store/store.tsx'; // Ensure this is the correct path to your Redux store
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
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
