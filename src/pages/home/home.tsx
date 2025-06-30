import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';
import NoIngredients from '@pages/no-ingredients/no-ingredients';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/ingredients-slice
import { getAllIngredients } from '@store/ingredients-slice';
import { JSX } from 'react';
import { TIngredients } from '@utils/types';

const Home = (): JSX.Element => {
	const ingredients: TIngredients = useSelector(getAllIngredients);

	if (ingredients?.length === 0) {
		return <NoIngredients />;
	}

	return (
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
};

export default Home;
