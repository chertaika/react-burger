import React from 'react';
import { useSelector } from 'react-redux';
import { getUserInfo } from '@store/user-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '@utils/constants';

const ProtectedRoute = ({ forUnauthenticatedOnly = false, children }) => {
	const user = useSelector(getUserInfo);
	const location = useLocation();

	if (!forUnauthenticatedOnly && !user) {
		return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
	}

	if (forUnauthenticatedOnly && user) {
		const { from } = location.state ?? { from: { pathname: routes.HOME } };
		return <Navigate to={from} replace />;
	}

	return children;
};

export default ProtectedRoute;
