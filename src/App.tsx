// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveWebinar from './pages/LiveWebinar'; // adjust path as per your structure
import Courses from './pages/Courses';
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';

{/* Import your logo image at the top of the file */ }

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/live-webinar" element={<LiveWebinar />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/login" element={<Login />} /> {/* Add this line for the login route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> 
        <Route path="/" element={<Home />}
        />
      </Routes>
    </Router>
  );
};
export default App;
