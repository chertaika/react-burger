import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';
import { JSX } from 'react';

type TOrderDetailsProps = {
	orderNumber: number;
};

const OrderDetails = ({ orderNumber }: TOrderDetailsProps): JSX.Element => {
	return (
		<>
			<span className={`${styles.title} text text_type_digits-large mt-4 mb-8`}>
				{orderNumber}
			</span>
			<span className={'text text_type_main-medium'}>идентификатор заказа</span>
			<div className={`${styles.icon_container} mt-15 mb-15`}>
				<CheckMarkIcon type={'primary'} className={styles.icon} />
			</div>
			<span className={'text_type_main-default'}>
				Ваш заказ начали готовить
			</span>
			<span
				className={
					'text text_type_main-default text_color_inactive mt-2 mb-15'
				}>
				Дождитесь готовности на орбитальной станции
			</span>
		</>
	);
};

export default OrderDetails;
