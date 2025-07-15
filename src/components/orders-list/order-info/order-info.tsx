import { JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getAllIngredients } from '@store/ingredients-slice';
import Preloader from '@components/preloader/preloader';
import {
	getOrder,
	getOrderByNumber,
	getOrderLoading,
	resetOrder,
} from '@store/order-slice';
import styles from './order-info.module.css';
import { orderStatus } from '@utils/constants';
import RoundImage from '@components/ui/round-image/round-image';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientCounts = Record<string, number>;

type TIngredientDisplay = {
	id: string;
	image: string;
	name: string;
	price: number;
	count: number;
};

const OrderInfo = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { number } = useParams();
	const ingredients = useAppSelector(getAllIngredients);

	useEffect(() => {
		if (number) {
			dispatch(getOrderByNumber(number));
		}
	}, [number, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(resetOrder());
		};
	}, [dispatch]);

	const order = useAppSelector(getOrder);
	const isOrderLoading = useAppSelector(getOrderLoading);

	const ingredientCounts: TIngredientCounts | undefined =
		order?.ingredients.reduce((acc: TIngredientCounts, id: string) => {
			acc[id] = (acc[id] || 0) + 1;
			return acc;
		}, {});

	const ingredientsForDisplay: Array<TIngredientDisplay> = ingredientCounts
		? Object.entries(ingredientCounts).map(([id, count]: [string, number]) => {
				const ingredientData = ingredients.find((item) => item._id === id);
				return {
					id,
					image: ingredientData?.image ?? '',
					name: ingredientData?.name ?? 'Неизвестный ингредиент',
					price: ingredientData?.price ?? 0,
					count,
				};
			})
		: [];

	const totalPrice = ingredientsForDisplay.reduce((total, item) => {
		return total + item.price * item.count;
	}, 0);

	if (isOrderLoading) return <Preloader />;

	return (
		<div className={styles.container}>
			{order ? (
				<>
					<h2 className={'text text_type_digits-default mb-10'}>
						#{order?.number}
					</h2>
					<p className={'text text_type_main-medium mb-2'}>{order?.name}</p>
					<p className={'text text_type_main-default text_color_success mb-15'}>
						{orderStatus[order.status]}
					</p>
					<p className={'text text_type_main-medium mb-6'}>Состав:</p>
					<div className={`${styles.ingredients} custom-scroll pr-6`}>
						{ingredientsForDisplay.map((item) => (
							<div key={item.id} className={styles.ingredient}>
								<RoundImage src={item.image} alt={item.name} />
								<span className={'text text_type_main-default'}>
									{item.name}
								</span>
								<div
									className={`${styles.ingredient_count} text text_type_digits-default`}>
									<span>{item.count}</span>X<span>{item.price}</span>
									<CurrencyIcon type={'primary'} />
								</div>
							</div>
						))}
					</div>
					<div className={`${styles.price} mt-10`}>
						<FormattedDate
							date={new Date(order.createdAt)}
							className={'text text_type_main-default text_color_inactive'}
						/>
						<div
							className={`${styles.ingredient_count} text text_type_digits-default`}>
							<span>{totalPrice}</span>
							<CurrencyIcon type={'primary'} />
						</div>
					</div>
				</>
			) : (
				<p className={'text text_type_main-large text_color_primary'}>
					Заказ не найден
				</p>
			)}
		</div>
	);
};

export default OrderInfo;
