import styles from './ingredients-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { useState } from 'react';
import IngredientDetails from '@components/burger-ingredients/ingredient-details/ingredient-details.jsx';

const IngredientsItem = ({ ingredient, count }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleClickIngredient = () => {
		setIsOpenModal(true);
	};

	const handleCloseModal = () => {
		setIsOpenModal(false);
	};

	return (
		<>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
			<li className={styles.ingredient} onClick={handleClickIngredient}>
				{count > 0 && <Counter count={count} size={'default'} />}
				<img
					className={`${styles.image} pr-4 pl-4`}
					src={ingredient.image}
					alt={ingredient.title}
				/>
				<div className={styles.price}>
					{ingredient.price}
					<CurrencyIcon type={'primary'} />
				</div>
				<p className={`${styles.title} text text_type_main-default`}>
					{ingredient.name}
				</p>
			</li>
			{isOpenModal && (
				<IngredientDetails ingredient={ingredient} onClose={handleCloseModal} />
			)}
		</>
	);
};

IngredientsItem.propTypes = {
	count: PropTypes.number.isRequired,
	ingredient: ingredientPropType.isRequired,
};

export default IngredientsItem;
