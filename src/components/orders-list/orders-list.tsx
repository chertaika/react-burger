import styles from './orders-list.module.css';
import OrdersListItem from '@components/orders-list/orders-list-item/orders-list-item';
import { TOrder } from '@utils/types';

type TOrdersListProps = {
	orders: Array<TOrder>;
};

const OrdersList = ({ orders }: TOrdersListProps) => {
	return (
		<ul className={`${styles.orders} custom-scroll`}>
			{orders.map((item) => (
				<OrdersListItem key={item._id} order={item} />
			))}
		</ul>
	);
};

export default OrdersList;
