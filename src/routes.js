// src\routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import User from './components/User/Layout/MiniDrawer';
import PrivateRoute from './components/Auth/PrivateRoute';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/super_admin/*"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              {/* <SuperAdmin /> */}
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
