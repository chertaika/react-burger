import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import {
	addBun,
	addFilling,
	getBun,
	getFillings,
} from '@store/burger-constructor-slice';
import noBunImage from '@images/no-bun.svg';
import BurgerDraggedItem from '@components/burger-constructor/burger-dragged-item/burger-dragged-item';
import { dragTypes } from '@utils/constants';
import OrderCheckout from '@components/burger-constructor/order-checkout/order-checkout';
import { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { TBun, TFilling, TIngredient } from '@utils/types';

const BurgerConstructor = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const fillings = useAppSelector(getFillings);
	const bun = useAppSelector(getBun);

	const isEmpty = !bun && fillings.length === 0;

	const [{ isHover }, dropTarget] = useDrop({
		accept: dragTypes.INGREDIENT,
		drop(ingredient: TIngredient) {
			ingredient.type === 'bun'
				? dispatch(addBun(ingredient as TBun))
				: dispatch(
						addFilling({ ...ingredient, uid: crypto.randomUUID() } as TFilling)
					);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	return (
		<section className={`${styles.burger_constructor} ml-4 mt-3`}>
			<div
				className={`${styles.ingredients_container} ${isEmpty ? styles.empty : ''} ${isHover ? styles.hovered : ''}`}
				ref={dropTarget}
				data-testid='burger-constructor'>
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
						<div className={'ml-8 mb-4'} data-testid={`burger-top-${bun?._id}`}>
							<ConstructorElement
								type='top'
								isLocked={true}
								text={bun ? `${bun?.name} (верх)` : 'Добавь булку 🥯'}
								price={bun?.price || 0}
								thumbnail={bun ? bun?.image : noBunImage}
							/>
						</div>
						<div className={`${styles.ingredients_list} custom-scroll`}>
							{fillings.length > 0 ? (
								fillings.map((item, i) => (
									<BurgerDraggedItem item={item} key={item.uid} index={i} />
								))
							) : (
								<p
									className={`${styles.placeholder} ml-8 mr-4 text_type_main-default`}>
									Добавь начинку 🥓 🧀
								</p>
							)}
						</div>
						<div
							className={'ml-8 mt-4'}
							data-testid={`burger-bottom-${bun?._id}`}>
							<ConstructorElement
								type='bottom'
								isLocked={true}
								text={bun ? `${bun?.name} (низ)` : 'Добавь булку 🥯'}
								price={bun?.price || 0}
								thumbnail={bun ? bun?.image : noBunImage}
								{...(bun && { extraClass: styles.bottom_ingredient })}
							/>
						</div>
					</>
				)}
			</div>
			<OrderCheckout isDisabledButton={!bun || fillings?.length === 0} />
		</section>
	);
};

export default BurgerConstructor;
