import React, { useEffect } from 'react';
import styles from './app.module.css';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';
import AppHeader from '@components/app-header/app-header';
import Preloader from '@components/preloader/preloader';
import ErrorBanner from '@components/error-banner/error-banner';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
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
							<Route
								path={'/'}
								element={
									<>
										<h1
											className={`${styles.title} text text_type_main-large mt-10 pl-5`}>
											Соберите бургер
										</h1>
										<DndProvider backend={HTML5Backend}>
											<main className={`${styles.main} pl-5 pr-5 mb-10`}>
												<BurgerIngredients />
												<BurgerConstructor />
											</main>
										</DndProvider>
									</>
								}
							/>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Registration />} />
							<Route path='/reset-password' element={<ResetPassword />} />
							<Route path='/forgot-password' element={<ForgotPassword />} />
							<Route path='/profile' element={<Profile />}>
								<Route index element={<ProfileSettings />} />
								<Route path={'orders'} element={<p>В разработке</p>} />
							</Route>
							<Route path='/ingredients/:id' element={<Ingredient />} />
							<Route path='*' element={<NotFound />} />
						</Routes>

						{background && (
							<Routes>
								<Route
									path='/ingredients/:id'
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
