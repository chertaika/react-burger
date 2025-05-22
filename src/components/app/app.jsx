import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '@components/burger-contructor/burger-constructor.jsx';
import AppHeader from '@components/app-header/app-header.jsx';
import Preloader from '@components/preloader/preloader.jsx';
import ErrorBanner from '@components/error-banner/error-banner.jsx';
import getInitialData from '@utils/api.js';

export const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	const getIngredients = async () => {
		try {
			const { data } = await getInitialData();
			setIngredients(data);
		} catch (error) {
			console.log(error);
			setErrorMessage(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCloseErrorBanner = () => {
		setErrorMessage('');
	};

	useEffect(() => {
		getIngredients();
	}, []);

	return (
		<div className={styles.app}>
			{isLoading ? (
				<Preloader />
			) : errorMessage.length > 0 ? (
				<ErrorBanner text={errorMessage} clearError={handleCloseErrorBanner} />
			) : (
				ingredients.length > 0 && (
					<>
						<AppHeader />
						<h1
							className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
							Соберите бургер
						</h1>
						<main className={`${styles.main} pl-5 pr-5 mb-10`}>
							<BurgerIngredients ingredients={ingredients} />
							<BurgerConstructor ingredients={ingredients} />
						</main>
					</>
				)
			)}
		</div>
	);
};
