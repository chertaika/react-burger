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

export const App = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const isLoading = useSelector(getIngredientsLoading);
	const errorMessage = useSelector(getIngredientsError);

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

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
						<h1
							className={`${styles.title} text text_type_main-large mt-10 pl-5`}>
							Соберите бургер
						</h1>
						<DndProvider backend={HTML5Backend}>
							<main className={`${styles.main} pl-5 pr-5 mb-10`}>
								<BurgerIngredients ingredients={ingredients} />
								<BurgerConstructor ingredients={ingredients} />
							</main>
						</DndProvider>
					</>
				)
			)}
		</div>
	);
};
