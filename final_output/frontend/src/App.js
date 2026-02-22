import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/GlobalStyles.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout Component
const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = localStorage.getItem('role') || 'owner';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <div className="sidebar-spacer"></div>
      <div className="main-wrapper">
        <Header user={user} onLogout={handleLogout} />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Placeholder components for other pages
const ForecastPage = () => <div className="card"><h1>Demand Forecasting</h1><p>Detailed forecasting analysis coming soon...</p></div>;
const InventoryPage = () => <div className="card"><h1>Inventory Management</h1><p>Stock optimization and reorder points tool.</p></div>;
const OptimizationPage = () => <div className="card"><h1>Optimization</h1><p>Cost and production optimization algorithms.</p></div>;
const AlertsPage = () => <div className="card"><h1>Smart Alerts</h1><p>Active alerts for your enterprise.</p></div>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/optimization" element={<OptimizationPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
