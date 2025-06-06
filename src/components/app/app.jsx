import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '@components/app-header/app-header';
import Preloader from '@components/preloader/preloader';
import ErrorBanner from '@components/error-banner/error-banner';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllIngredients,
	getIngredients,
	getIngredientsError,
	getIngredientsLoading,
} from '@store/ingredients-slice';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { routes } from '@utils/constants';
import Home from '@pages/home/home';

export const App = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const isLoading = useSelector(getIngredientsLoading);
	const errorMessage = useSelector(getIngredientsError);

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<div className={styles.app}>
			{isLoading ? (
				<Preloader />
			) : errorMessage ? (
				<ErrorBanner text={errorMessage} />
			) : (
				ingredients?.length > 0 && (
					<>
						<AppHeader />

						<Routes location={background || location}>
							<Route path={routes.HOME} element={<Home />} />
							<Route path={routes.LOGIN} element={<Login />} />
							<Route path={routes.REGISTER} element={<Registration />} />
							<Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
							<Route
								path={routes.FORGOT_PASSWORD}
								element={<ForgotPassword />}
							/>
							<Route path={routes.PROFILE} element={<Profile />}>
								<Route index element={<ProfileSettings />} />
								<Route
									path={routes.PROFILE_ORDERS}
									element={
										<p className={'text text_type_main-large'}>
											В разработке...
										</p>
									}
								/>
							</Route>
							<Route path={routes.INGREDIENT} element={<Ingredient />} />
							<Route path='*' element={<NotFound />} />
						</Routes>

						{background && (
							<Routes>
								<Route
									path={routes.INGREDIENT}
									element={
										<Modal
											onClose={handleModalClose}
											title={'Детали ингредиента'}>
											<IngredientDetails />
										</Modal>
									}
								/>
							</Routes>
						)}
					</>
				)
			)}
		</div>
	);
};
