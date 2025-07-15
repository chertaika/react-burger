import { JSX, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '@components/app-header/app-header';
import Preloader from '@components/preloader/preloader';
import ErrorBanner from '@components/error-banner/error-banner';
import {
	getIngredients,
	getIngredientsError,
	getIngredientsLoading,
} from '@store/ingredients-slice';
import {
	Location,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import Login from '@pages/auth/login';
import Registration from '@pages/auth/registration';
import ResetPassword from '@pages/auth/reset-password';
import ForgotPassword from '@pages/auth/forgot-password';
import Profile from '@pages/profile/profile';
import ProfileSettings from '@components/profile/profile-settings/profile-settings';
import Ingredient from '@pages/ingredient/ingredient';
import IngredientDetails from '@components/burger-ingredients/ingredient-details/ingredient-details';
import Modal from '@components/modal/modal';
import NotFound from '@pages/not-found/not-found';
import Feed from '@pages/feed/feed';
import { routes } from '@utils/constants';
import Home from '@pages/home/home';
import ProtectedRoute from '@components/protected-route/protected-route';
import { checkUserAuth } from '@store/user-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import OrderInfo from '@components/orders-list/order-info/order-info';
import Order from '@pages/order/order';
import UserOrders from '@components/profile/user-orders/user-orders';

export const App = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(getIngredientsLoading);
	const errorMessage = useAppSelector(getIngredientsError);

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(getIngredients());
	}, [dispatch]);

	const location = useLocation();
	const navigate = useNavigate();
	const background: Location = location.state?.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	const renderContent = (): JSX.Element => {
		if (isLoading) {
			return <Preloader />;
		}

		if (errorMessage) {
			return <ErrorBanner text={errorMessage} />;
		}

		return (
			<>
				<AppHeader />
				<Routes location={background || location}>
					<Route path={routes.HOME} element={<Home />} />
					<Route
						path={routes.LOGIN}
						element={
							<ProtectedRoute forUnauthenticatedOnly={true}>
								<Login />
							</ProtectedRoute>
						}
					/>
					<Route
						path={routes.REGISTER}
						element={
							<ProtectedRoute forUnauthenticatedOnly={true}>
								<Registration />
							</ProtectedRoute>
						}
					/>
					<Route
						path={routes.RESET_PASSWORD}
						element={
							<ProtectedRoute forUnauthenticatedOnly={true}>
								<ResetPassword />
							</ProtectedRoute>
						}
					/>
					<Route
						path={routes.FORGOT_PASSWORD}
						element={
							<ProtectedRoute forUnauthenticatedOnly={true}>
								<ForgotPassword />
							</ProtectedRoute>
						}
					/>
					<Route
						path={routes.PROFILE}
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}>
						<Route index element={<ProfileSettings />} />
						<Route path={routes.USER_ORDERS} element={<UserOrders />} />
					</Route>
					<Route
						path={routes.USER_ORDER}
						element={
							<ProtectedRoute>
								<Order />
							</ProtectedRoute>
						}
					/>
					<Route path={routes.INGREDIENT} element={<Ingredient />} />
					<Route path={routes.FEED} element={<Feed />} />
					<Route path={routes.FEED_ITEM} element={<Order />} />
					<Route path='*' element={<NotFound />} />
				</Routes>

				{background && (
					<Routes>
						<Route
							path={routes.INGREDIENT}
							element={
								<Modal onClose={handleModalClose} title={'Детали ингредиента'}>
									<IngredientDetails />
								</Modal>
							}
						/>
						<Route
							path={routes.FEED_ITEM}
							element={
								<Modal onClose={handleModalClose}>
									<OrderInfo />
								</Modal>
							}
						/>

						<Route
							path={routes.USER_ORDER}
							element={
								<Modal onClose={handleModalClose}>
									<OrderInfo />
								</Modal>
							}
						/>
					</Routes>
				)}
			</>
		);
	};

	return <div className={styles.app}>{renderContent()}</div>;
};
