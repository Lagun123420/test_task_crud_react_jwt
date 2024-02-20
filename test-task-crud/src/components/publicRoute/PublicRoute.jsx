import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return !currentUser ? children : <Navigate to="/catalog/new" />;  
};

export default PublicRoute;