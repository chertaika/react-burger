import styles from './order.module.css';
import OrderInfo from '@components/orders-list/order-info/order-info';

const Order = () => {
	return (
		<div className={styles.container}>
			<OrderInfo />
		</div>
	);
};

export default Order;
