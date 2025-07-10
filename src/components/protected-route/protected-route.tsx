import { ReactNode } from 'react';
import { getIsAuthChecked, getUserInfo } from '@store/user-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '@utils/constants';
import Preloader from '@components/preloader/preloader';
import { useAppSelector } from '@store/hooks';

type TProtectedRouteProps = {
	forUnauthenticatedOnly?: boolean;
	children: ReactNode;
};

const ProtectedRoute = ({
	forUnauthenticatedOnly = false,
	children,
}: TProtectedRouteProps): ReactNode => {
	const user = useAppSelector(getUserInfo);
	const location = useLocation();
	const isUserAuthChecked = useAppSelector(getIsAuthChecked);

	if (!isUserAuthChecked) {
		return <Preloader />;
	}

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
