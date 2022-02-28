import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorageToken from '../../useLocalStorageToken';

const ProtectedRoute = () => {
	const token = useLocalStorageToken();
	return token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
