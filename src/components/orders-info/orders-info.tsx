import styles from './orders-info.module.css';
import { useAppSelector } from '@store/hooks';
import {
	getAllOrders,
	getAllOrdersTotal,
	getAllOrdersTotalToday,
} from '@store/all-orders-slice';

const OrdersInfo = () => {
	const orders = useAppSelector(getAllOrders);
	const total = useAppSelector(getAllOrdersTotal);
	const totalToday = useAppSelector(getAllOrdersTotalToday);

	const doneOrders = orders
		? orders.filter((order) => order.status === 'done').slice(0, 12)
		: [];
	const pendingOrders = orders
		? orders.filter((order) => order.status === 'pending').slice(0, 12)
		: [];

	return (
		<div className={styles.feed_info}>
			<div className={styles.orders_boards}>
				<div className={styles.orders_board}>
					<p className={'text text_type_main-medium'}>Готовы:</p>
					<div className={styles.orders}>
						{doneOrders.map((item) => (
							<span
								className={'text text_type_digits-default text_color_success'}
								key={item._id}>
								{item.number}
							</span>
						))}
					</div>
				</div>
				<div className={styles.orders_board}>
					<p className={'text text_type_main-medium'}>В работе:</p>
					<div className={styles.orders}>
						{pendingOrders.map((item) => (
							<span className={'text text_type_digits-default'} key={item._id}>
								{item.number}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className={styles.total}>
				<span className={'text text_type_main-medium'}>
					Выполнено за все время:
				</span>
				<span className={`${styles.total_value} text text_type_digits-large`}>
					{total}
				</span>
			</div>
			<div className={styles.total}>
				<span className={'text text_type_main-medium'}>
					Выполнено за сегодня:
				</span>
				<span className={`${styles.total_value} text text_type_digits-large`}>
					{totalToday}
				</span>
			</div>
		</div>
	);
};

export default OrdersInfo;
