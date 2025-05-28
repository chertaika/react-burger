import styles from './ingredients-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '@store/ingredient-details-slice';
import { useDrag } from 'react-dnd';
import { dragTypes } from '@utils/constants';

const IngredientsItem = ({ ingredient, count }) => {
	const dispatch = useDispatch();

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: dragTypes.INGREDIENT,
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const handleClickIngredient = () => {
		dispatch(setCurrentIngredient(ingredient));
	};

	return (
		<>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
			<li
				className={`${styles.ingredient} ${isDragging ? styles.dragging : ''}`}
				onClick={handleClickIngredient}
				ref={dragRef}>
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
		</>
	);
};

IngredientsItem.propTypes = {
	count: PropTypes.number.isRequired,
	ingredient: ingredientPropType.isRequired,
};

export default IngredientsItem;
