import { useMemo, useRef, useState, UIEvent } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '@components/burger-ingredients/ingredients-group/ingredients-group.tsx';
import { useSelector } from 'react-redux';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/burger-constructor-slice
import { getIngredientsCount } from '@store/burger-constructor-slice';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/ingredients-slice
import { getAllIngredients } from '@store/ingredients-slice';
import { ingredientTypeTranslations } from '@utils/constants';
import { TIngredients, TIngredientsCount, TIngredientType } from '@utils/types';

type TRef = {
	[key in TIngredientType]: HTMLElement | null;
};

type TGroupedIngredients = Record<TIngredientType, TIngredients>;

const BurgerIngredients = () => {
	const ingredientsCount: TIngredientsCount = useSelector(getIngredientsCount);
	const ingredients: TIngredients = useSelector(getAllIngredients);

	const [activeType, setActiveType] = useState(
		Object.keys(ingredientTypeTranslations)[0]
	);

	const groupRefs = useRef<TRef>({
		bun: null,
		main: null,
		sauce: null,
	});

	const groupedIngredients = useMemo(() => {
		return ingredients.reduce<TGroupedIngredients>(
			(acc, item) => {
				acc[item.type].push(item);
				return acc;
			},
			{ bun: [], sauce: [], main: [] }
		);
	}, [ingredients]);

	const handleScrollToAnchor = (type: TIngredientType) => {
		const element = groupRefs.current[type];
		if (element) {
			setActiveType(type);
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const handleScrollContainer = (e: UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		const containerTop = target.getBoundingClientRect().top;
		const refs = groupRefs.current;
		let closestType = null;
		let minDistance = Infinity;

		for (const type of Object.keys(refs) as Array<TIngredientType>) {
			const element = refs[type];
			if (!element) continue;

			const elementTop = element.getBoundingClientRect().top;
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
					{(
						Object.keys(ingredientTypeTranslations) as Array<TIngredientType>
					).map((type) => (
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
				{(Object.keys(groupedIngredients) as Array<TIngredientType>).map(
					(type) => (
						<IngredientsGroup
							key={type}
							type={ingredientTypeTranslations[type]}
							items={groupedIngredients[type]}
							ref={(element) => (groupRefs.current[type] = element)}
							ingredientsCount={ingredientsCount}
						/>
					)
				)}
			</div>
		</section>
	);
};

export default BurgerIngredients;
