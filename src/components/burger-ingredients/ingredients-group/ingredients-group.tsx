import { forwardRef } from 'react';
import styles from './ingredients-group.module.css';
import IngredientsItem from '@components/burger-ingredients/ingredients-item/ingredients-item';
import { TIngredients, TIngredientsCount } from '@utils/types';

type TIngredientsGroupProps = {
	type: string;
	items: TIngredients;
	ingredientsCount: TIngredientsCount;
};

const IngredientsGroup = forwardRef<HTMLElement, TIngredientsGroupProps>(
	({ type, items, ingredientsCount }, ref) => (
		<article className={styles.ingredients_group} ref={ref}>
			<h2 className={'text text_type_main-medium'}>{type}</h2>
			<ul className={styles.ingredients_list}>
				{items.map((item) => (
					<IngredientsItem
						key={item._id}
						ingredient={item}
						count={ingredientsCount[item._id] || 0}
					/>
				))}
			</ul>
		</article>
	)
);

export default IngredientsGroup;
