import styles from './ingredients-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { useDrag } from 'react-dnd';
import { dragTypes, routes } from '@utils/constants';
import { Link, useLocation } from 'react-router-dom';

const IngredientsItem = ({ ingredient, count }) => {
	const location = useLocation();

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: dragTypes.INGREDIENT,
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<li
			className={`${styles.ingredient} ${isDragging ? styles.dragging : ''}`}
			ref={dragRef}>
			<Link
				to={`${routes.INGREDIENTS}/${ingredient?._id}`}
				state={{ background: location }}
				className={`${styles.link} text_color_primary`}>
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
			</Link>
		</li>
	);
};

IngredientsItem.propTypes = {
	count: PropTypes.number.isRequired,
	ingredient: ingredientPropType.isRequired,
};

export default IngredientsItem;
