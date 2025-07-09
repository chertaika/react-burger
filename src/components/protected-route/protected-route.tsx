import { ReactNode } from 'react';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/user-slice
import { getIsAuthChecked, getUserInfo } from '@store/user-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '@utils/constants';
import Preloader from '@components/preloader/preloader';
import { TUser } from '@utils/types';
import { useAppSelector } from '@store/store';

type TProtectedRouteProps = {
	forUnauthenticatedOnly?: boolean;
	children: ReactNode;
};

const ProtectedRoute = ({
	forUnauthenticatedOnly = false,
	children,
}: TProtectedRouteProps): ReactNode => {
	const user: TUser = useAppSelector(getUserInfo);
	const location = useLocation();
	const isUserAuthChecked: boolean = useAppSelector(getIsAuthChecked);

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
