// src\routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import User from './components/User/Layout/MiniDrawer';
import PrivateRoute from './components/Auth/PrivateRoute';
import SuperAdmin from './components/Admin/Layout/MiniDrawer';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/hr/*"
          element={
            <PrivateRoute allowedRoles={['HR']}>
              <SuperAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/*"
          element={
            // <User />
            <PrivateRoute allowedRoles={['Employee']}>
            <User />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
