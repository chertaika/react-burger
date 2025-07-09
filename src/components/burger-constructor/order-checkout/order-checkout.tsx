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
	getOrderErrorMessage,
	getOrderLoading,
	getOrderNumber,
	resetOrder,
	// @ts-expect-error: TS7016: Could not find a declaration file for module @store/order-slice
} from '@store/order-slice';
import {
	getTotalPrice,
	resetConstructor,
	// @ts-expect-error: TS7016: Could not find a declaration file for module @store/burger-constructor-slice
} from '@store/burger-constructor-slice';
import ErrorBanner from '@components/error-banner/error-banner';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/user-slice
import { getUserInfo } from '@store/user-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@utils/constants';
import { JSX } from 'react';
import { TUser } from '@utils/types';
import { useAppDispatch, useAppSelector } from '@store/store';

type TOrderCheckoutProps = {
	isDisabledButton: boolean;
};

const OrderCheckout = ({
	isDisabledButton,
}: TOrderCheckoutProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const totalPrice: number = useAppSelector(getTotalPrice);
	const orderNumber: number = useAppSelector(getOrderNumber);
	const isLoading: boolean = useAppSelector(getOrderLoading);
	const errorMessage: string = useAppSelector(getOrderErrorMessage);
	const user: TUser = useAppSelector(getUserInfo);

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
