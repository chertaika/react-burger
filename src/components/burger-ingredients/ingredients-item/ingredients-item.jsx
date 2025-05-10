import styles from './ingredients-item.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsItem = ({ ingredient, count }) => {
	return (
		<li className={styles.ingredient}>
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
	);
};

export default IngredientsItem;
