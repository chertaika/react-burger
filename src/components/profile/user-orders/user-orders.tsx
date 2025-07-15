import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
	getUserOrders,
	getUserOrdersError,
	userOrdersConnect,
	userOrdersDisconnect,
} from '@store/user-orders-slice';
import { wss } from '@utils/constants';
import Preloader from '@components/preloader/preloader';
import ErrorBanner from '@components/error-banner/error-banner';
import OrdersList from '@components/orders-list/orders-list';
import styles from './user-orders.module.css';

const UserOrders = () => {
	const dispatch = useAppDispatch();
	const orders = useAppSelector(getUserOrders);
	const error = useAppSelector(getUserOrdersError);

	useEffect(() => {
		dispatch(userOrdersConnect(wss.USER_ORDERS_URL));

		return () => {
			dispatch(userOrdersDisconnect());
		};
	}, [dispatch]);

	let content;

	if (!orders) {
		if (!error) {
			content = <Preloader />;
		} else {
			content = <ErrorBanner text={error} />;
		}
	} else {
		content = <OrdersList orders={orders} />;
	}

	return <div className={styles.container}>{content}</div>;
};

export default UserOrders;
