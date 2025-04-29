import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './auth-provider';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, and save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
