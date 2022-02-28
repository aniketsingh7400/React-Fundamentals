import React from 'react';
import { getUser } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
	const storeUser = useSelector(getUser);
	const role = storeUser.role;

	return storeUser && storeUser.isAuth ? (
		role.toLowerCase() === 'admin' ? (
			children
		) : (
			<Navigate to='/courses' />
		)
	) : (
		<Navigate to='/login' />
	);
};

export default PrivateRouter;
