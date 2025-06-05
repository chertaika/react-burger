import { useMemo, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '@components/burger-ingredients/ingredients-group/ingredients-group.jsx';
import { ingredientTypeTranslations } from '@utils/ingredients.js';
import { useSelector } from 'react-redux';
import { getIngredientsCount } from '@store/burger-constructor-slice';
import { getAllIngredients } from '@store/ingredients-slice';

const BurgerIngredients = () => {
	const ingredientsCount = useSelector(getIngredientsCount);
	const ingredients = useSelector(getAllIngredients);

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

	const handleScrollContainer = (e) => {
		const containerTop = e.target.getBoundingClientRect().top;
		const refs = groupRefs.current;
		let closestType = null;
		let minDistance = Infinity;

		for (const type of Object.keys(refs)) {
			const elementTop = refs[type].getBoundingClientRect().top;
			const distance = Math.abs(elementTop - containerTop);

			if (distance < minDistance) {
				minDistance = distance;
				closestType = type;
			}
		}

		if (closestType && closestType !== activeType) {
			setActiveType(closestType);
		}
	};

	return (
		<section className={`${styles.burger_ingredients} mt-5`}>
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
			<div
				className={`${styles.ingredients_list} custom-scroll`}
				onScroll={handleScrollContainer}>
				{Object.keys(groupedIngredients).map((type) => (
					<IngredientsGroup
						key={type}
						type={ingredientTypeTranslations[type]}
						items={groupedIngredients[type]}
						ref={(element) => (groupRefs.current[type] = element)}
						ingredientsCount={ingredientsCount}
					/>
				))}
			</div>
		</section>
	);
};

export default BurgerIngredients;
