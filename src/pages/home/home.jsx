import React from 'react';
import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';

const Home = () => (
	<div className={`${styles.container} pl-5 pr-5 mt-10`}>
		<h1 className={'text text_type_main-large'}>Соберите бургер</h1>
		<DndProvider backend={HTML5Backend}>
			<main className={`${styles.main} mb-10`}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</DndProvider>
	</div>
);

export default Home;
