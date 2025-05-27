import { useMemo, useState } from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '@components/burger-constructor/order-details/order-details';
import Modal from '@components/modal/modal';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
	addBun,
	addFilling,
	getBun,
	getFillings,
	removeFilling,
} from '@store/burger-constructor-slice';
import noBunImage from '@images/no-bun.svg';

const BurgerConstructor = ({ ingredients }) => {
	const dispatch = useDispatch();
	const fillings = useSelector(getFillings);
	const bun = useSelector(getBun);

	const isEmpty = !bun && fillings.length === 0;

	const [isOpenModal, setIsOpenModal] = useState(false);

	const [{ isHover }, dropTarget] = useDrop({
		accept: 'ingredient',
		drop({ ingredient }) {
			ingredient.type === 'bun'
				? dispatch(addBun(ingredient))
				: dispatch(addFilling({ ...ingredient, uid: crypto.randomUUID() }));
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

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

	const handleRemoveFilling = (uid) => {
		dispatch(removeFilling(uid));
	};

	return (
		<section className={`${styles.burger_constructor} ml-4 mt-3`}>
			<div
				className={`${styles.ingredients_container} ${isEmpty ? styles.empty : ''} ${isHover ? styles.hovered : ''}`}
				ref={dropTarget}>
				{isEmpty ? (
					<>
						<p className={'text text_type_main-medium'}>
							Перетащи ингредиенты сюда 🍔
						</p>
						<p className={'text text_type_main-default text_color_inactive'}>
							Выбери булку и начинки слева
						</p>
					</>
				) : (
					<>
						<div className={'ml-8 mb-4'}>
							<ConstructorElement
								type='top'
								isLocked={true}
								text={bun ? `${bun?.name} (верх)` : 'Добавь булку 🥯'}
								price={bun?.price}
								thumbnail={bun ? bun?.image : noBunImage}
							/>
						</div>
						<div className={`${styles.ingredients_list} custom-scroll`}>
							{fillings.length > 0 ? (
								fillings.map((item) => (
									<article className={styles.ingredient} key={item.uid}>
										<DragIcon type='primary' />
										<ConstructorElement
											text={item.name}
											price={item.price}
											thumbnail={item.image}
											handleClose={() => handleRemoveFilling(item.uid)}
										/>
									</article>
								))
							) : (
								<p
									className={`${styles.placeholder} ml-8 mr-4 text_type_main-default`}>
									Добавь начинку 🥓 🧀
								</p>
							)}
						</div>
						<div className={'ml-8 mt-4'}>
							<ConstructorElement
								type='bottom'
								isLocked={true}
								text={bun ? `${bun?.name} (низ)` : 'Добавь булку 🥯'}
								price={bun?.price}
								thumbnail={bun ? bun?.image : noBunImage}
								{...(bun && { extraClass: styles.bottom_ingredient })}
							/>
						</div>
					</>
				)}
			</div>
			<div className={`${styles.total} mt-8 ml-4 mr-4`}>
				<div className={styles.price}>
					<span className={'text text_type_digits-medium'}>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleSendOrder}
					disabled={isEmpty}>
					Оформить заказ
				</Button>
			</div>
			{isOpenModal && (
				<Modal onClose={handleCloseModal}>
					<OrderDetails
						orderNumber={Math.floor(100000 + Math.random() * 900000)}
					/>
				</Modal>
			)}
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
