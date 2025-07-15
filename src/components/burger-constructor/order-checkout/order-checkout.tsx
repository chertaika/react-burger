import styles from './order-checkout.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '@components/modal/modal';
import OrderDetails from '@components/burger-constructor/order-details/order-details';
import {
	clearError,
	createOrder,
	getOrder,
	getOrderErrorMessage,
	getOrderLoading,
	resetOrder,
} from '@store/order-slice';
import {
	getTotalPrice,
	resetConstructor,
} from '@store/burger-constructor-slice';
import ErrorBanner from '@components/error-banner/error-banner';
import { getUserInfo } from '@store/user-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@utils/constants';
import { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';

type TOrderCheckoutProps = {
	isDisabledButton: boolean;
};

const OrderCheckout = ({
	isDisabledButton,
}: TOrderCheckoutProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const totalPrice = useAppSelector(getTotalPrice);
	const order = useAppSelector(getOrder);
	const orderNumber = order ? order.number : null;
	const isLoading = useAppSelector(getOrderLoading);
	const errorMessage = useAppSelector(getOrderErrorMessage);
	const user = useAppSelector(getUserInfo);

	const handleSendOrder = (): void => {
		if (user) {
			dispatch(createOrder());
		} else {
			navigate(routes.LOGIN, { state: { from: location } });
		}
	};

	const handleCloseModal = (): void => {
		dispatch(resetConstructor());
		dispatch(resetOrder());
	};

	const handleCloseErrorBanner = (): void => {
		dispatch(clearError());
	};

	return (
		<>
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
					disabled={isDisabledButton || isLoading}>
					{isLoading ? (
						<span className={'loading'}>Отправляется...</span>
					) : (
						'Оформить заказ'
					)}
				</Button>
			</div>
			{errorMessage && (
				<ErrorBanner text={errorMessage} clearError={handleCloseErrorBanner} />
			)}
			{orderNumber && (
				<Modal onClose={handleCloseModal}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
		</>
	);
};

export default OrderCheckout;
