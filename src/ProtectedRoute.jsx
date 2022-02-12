import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	return localStorage.length > 0 ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
