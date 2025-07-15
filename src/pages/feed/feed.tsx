import { useEffect } from 'react';
import styles from './feed.module.css';
import Preloader from '@components/preloader/preloader';
import OrdersList from '@components/orders-list/orders-list';
import OrdersInfo from '@components/orders-info/orders-info';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
	allOrdersConnect,
	allOrdersDisconnect,
	getAllOrders,
	getAllOrdersError,
} from '@store/all-orders-slice';
import ErrorBanner from '@components/error-banner/error-banner';
import { wss } from '@utils/constants';

const Feed = () => {
	const dispatch = useAppDispatch();

	const orders = useAppSelector(getAllOrders);
	const error = useAppSelector(getAllOrdersError);

	useEffect(() => {
		dispatch(allOrdersConnect(wss.All_ORDERS_URL));

		return () => {
			dispatch(allOrdersDisconnect());
		};
	}, [dispatch]);

	if (!orders) {
		return !error ? <Preloader /> : <ErrorBanner text={error} />;
	}

	return (
		<div className={`${styles.feed} pl-5 pr-5 mt-10`}>
			<h2 className={'text text_type_main-large'}>Лента заказов</h2>
			<div className={styles.container}>
				<OrdersList orders={orders} />
				<OrdersInfo />
			</div>
		</div>
	);
};

export default Feed;
