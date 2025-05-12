import { useMemo, useState } from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '@components/burger-contructor/order-details/order-details.jsx';

const BurgerConstructor = ({ ingredients }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);

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

	const handleSendOrder = () => {
		setIsOpenModal(true);
	};

	const handleCloseModal = () => {
		setIsOpenModal(false);
	};

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
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleSendOrder}>
					Оформить заказ
				</Button>
			</div>
			{isOpenModal && (
				<OrderDetails
					onClose={handleCloseModal}
					orderNumber={Math.floor(100000 + Math.random() * 900000)}
				/>
			)}
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
