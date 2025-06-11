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
} from '@store/order-slice';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTotalPrice,
	resetConstructor,
} from '@store/burger-constructor-slice';
import Preloader from '@components/preloader/preloader';
import ErrorBanner from '@components/error-banner/error-banner';
import * as PropTypes from 'prop-types';
import { getUserInfo } from '@store/user-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@utils/constants';

const OrderCheckout = ({ isDisabledButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const totalPrice = useSelector(getTotalPrice);
	const orderNumber = useSelector(getOrderNumber);
	const isLoading = useSelector(getOrderLoading);
	const errorMessage = useSelector(getOrderErrorMessage);
	const user = useSelector(getUserInfo);

	const handleSendOrder = () => {
		if (user) {
			dispatch(createOrder());
		} else {
			navigate(routes.LOGIN, { state: { from: location } });
		}
	};

	const handleCloseModal = () => {
		dispatch(resetConstructor());
		dispatch(resetOrder());
	};

	const handleCloseErrorBanner = () => {
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
					disabled={isDisabledButton || isLoading}
					children={isLoading && <Preloader />}>
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

OrderCheckout.propTypes = {
	isDisabledButton: PropTypes.bool,
};

export default OrderCheckout;
