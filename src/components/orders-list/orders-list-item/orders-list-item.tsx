import styles from './orders-list-item.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '@store/hooks';
import { getAllIngredients } from '@store/ingredients-slice';
import { orderStatus, routes } from '@utils/constants';
import { Link, useLocation } from 'react-router-dom';
import RoundImage from '@components/ui/round-image/round-image';
import { TIngredient, TOrder } from '@utils/types';

type TOrdersListItemProps = {
	order: TOrder;
};

const OrdersListItem = ({ order }: TOrdersListItemProps) => {
	const ingredients = useAppSelector(getAllIngredients);
	const location = useLocation();

	const isUserOrder =
		location.pathname === `${routes.PROFILE}/${routes.USER_ORDERS}`;

	const getTotalPrice = (currentIngredients: Array<string>): number => {
		if (!currentIngredients || !Array.isArray(currentIngredients)) return 0;

		let total = 0;

		currentIngredients.forEach((ingredientId) => {
			const ingredient = ingredients.find((item) => item._id === ingredientId);
			if (ingredient) {
				total += ingredient.price;
			}
		});

		return total;
	};

	return (
		<li>
			<Link
				to={`${location.pathname}/${order?.number}`}
				state={{ background: location }}
				className={`${styles.order} text_color_primary`}>
				<div className={styles.order_header}>
					<span className={'text text_type_digits-default'}>
						#{order.number}
					</span>
					<FormattedDate
						date={new Date(order.createdAt)}
						className={'text text_type_main-default text_color_inactive'}
					/>
				</div>
				<h3 className={'text text_type_main-medium mt-6'}>{order.name}</h3>
				{isUserOrder && (
					<p
						className={`text text_type_main-default ${order.status === 'done' ? styles.success : ''} mt-2`}>
						{orderStatus[order.status]}
					</p>
				)}
				<div className={`${styles.order_details} mt-6`}>
					<div className={styles.ingredients}>
						{order.ingredients.map((item, i) => {
							const currentIngredient = ingredients.find(
								(ingredient) => ingredient._id === item
							) as TIngredient;
							return (
								<div className={styles.ingredient} key={i}>
									<RoundImage
										src={currentIngredient.image}
										alt={currentIngredient.name}
									/>
								</div>
							);
						})}
					</div>
					<span className={`${styles.price} text text_type_digits-default`}>
						{getTotalPrice(order.ingredients)}
						<CurrencyIcon type={'primary'} />
					</span>
				</div>
			</Link>
		</li>
	);
};

export default OrdersListItem;
