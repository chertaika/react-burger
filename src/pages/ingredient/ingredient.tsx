import styles from './ingredient.module.css';
import { JSX } from 'react';
import IngredientDetails from '@components/burger-ingredients/ingredient-details/ingredient-details';

const Ingredient = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-large mt-3 mb-3'}>
				Детали ингредиента
			</h2>
			<IngredientDetails />
		</div>
	);
};

export default Ingredient;
