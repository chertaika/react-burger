import { forwardRef } from 'react';
import styles from './ingredients-group.module.css';
import IngredientsItem from '@components/burger-ingredients/ingredients-item/ingredients-item.jsx';

const IngredientsGroup = forwardRef(({ type, items }, ref) => {
	return (
		<article className={styles.ingredients_group} ref={ref}>
			<h2 className={'text text_type_main-medium'}>{type}</h2>
			<ul className={styles.ingredients_list}>
				{items.map((item, i) => (
					<IngredientsItem
						key={item._id}
						ingredient={item}
						count={i === 0 ? 1 : 0}
					/>
				))}
			</ul>
		</article>
	);
});

export default IngredientsGroup;
