import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ ingredients }) => {
	const bun = useMemo(
		() => ingredients.find((item) => item.type === 'bun'),
		[ingredients]
	);
	const otherIngredients = useMemo(
		() => ingredients.filter((item) => item.type !== 'bun'),
		[ingredients]
	);
	const totalPrice = useMemo(() => {
		const nonBunPrice = otherIngredients.reduce(
			(sum, item) => sum + item.price,
			0
		);

		return nonBunPrice + (bun ? bun.price * 2 : 0);
	}, [otherIngredients, bun]);

	return (
		<section className={`${styles.burger_constructor} ml-4`}>
			<div className={'ml-8 mb-4'}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={bun.name}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</div>
			<div className={`${styles.ingredients_list} custom-scroll`}>
				{otherIngredients.map((item) => (
					<article className={styles.ingredient} key={item._id}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={item.name}
							price={item.price}
							thumbnail={item.image}
						/>
					</article>
				))}
			</div>
			<div className={'ml-8 mt-4'}>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={bun.name}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</div>
			<div className={`${styles.total} mt-10 ml-4 mr-4`}>
				<div className={styles.price}>
					<span className={'text text_type_digits-medium'}>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
