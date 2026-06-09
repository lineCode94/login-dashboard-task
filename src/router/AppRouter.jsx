import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRouter;
