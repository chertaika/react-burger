import styles from './ingredients-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { dragTypes, routes } from '@utils/constants';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '@utils/types';
import { JSX } from 'react';

type TIngredientsItemProps = {
	count: number;
	ingredient: TIngredient;
};

const IngredientsItem = ({
	ingredient,
	count,
}: TIngredientsItemProps): JSX.Element => {
	const location = useLocation();

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: dragTypes.INGREDIENT,
		item: ingredient,
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
					alt={ingredient.name}
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

export default IngredientsItem;
