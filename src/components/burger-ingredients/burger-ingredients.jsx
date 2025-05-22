import { useMemo, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import IngredientsGroup from '@components/burger-ingredients/ingredients-group/ingredients-group.jsx';
import { ingredientTypeTranslations } from '@utils/ingredients.js';

const BurgerIngredients = ({ ingredients }) => {
	const [activeType, setActiveType] = useState(
		Object.keys(ingredientTypeTranslations)[0]
	);

	const groupRefs = useRef({});

	const groupedIngredients = useMemo(() => {
		return ingredients.reduce(
			(acc, item) => {
				acc[item.type].push(item);
				return acc;
			},
			{ bun: [], sauce: [], main: [] }
		);
	}, [ingredients]);

	const handleScrollToAnchor = (type) => {
		const element = groupRefs.current[type];
		if (element) {
			setActiveType(type);
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					{Object.keys(ingredientTypeTranslations).map((type) => (
						<Tab
							key={type}
							value={type}
							active={type === activeType}
							onClick={() => handleScrollToAnchor(type)}>
							{ingredientTypeTranslations[type]}
						</Tab>
					))}
				</ul>
			</nav>
			<div className={`${styles.ingredients_list} custom-scroll`}>
				{Object.keys(groupedIngredients).map((type) => (
					<IngredientsGroup
						key={type}
						type={ingredientTypeTranslations[type]}
						items={groupedIngredients[type]}
						ref={(element) => (groupRefs.current[type] = element)}
					/>
				))}
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;
