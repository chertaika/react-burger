import { forwardRef } from 'react';
import styles from './ingredients-group.module.css';
import IngredientsItem from '@components/burger-ingredients/ingredients-item/ingredients-item.jsx';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';

const IngredientsGroup = forwardRef(
	({ type, items, ingredientsCount }, ref) => {
		return (
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
		);
	}
);

IngredientsGroup.propTypes = {
	type: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	ingredientsCount: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default IngredientsGroup;
