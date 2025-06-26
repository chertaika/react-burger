import React, { useState } from 'react';
import styles from '@pages/auth/auth.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { EMAIL_REGEX, routes } from '@utils/constants';
import useFormValidator from '@/hooks/useFormValidator';
import { apiRestorePassword } from '@utils/api';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [requestError, setRequestError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { inputValues, isValid, handleChange } = useFormValidator({
		email: '',
	});

	const handleSendEmail = async (e) => {
		setRequestError('');
		setIsLoading(true);
		e.preventDefault();
		try {
			await apiRestorePassword(inputValues);
			navigate(routes.RESET_PASSWORD, {
				state: { from: 'forgot-password' },
			});
		} catch (error) {
			console.log(error);
			setRequestError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-medium mb-6'}>
				Восстановление пароля
			</h2>
			<form className={styles.form} onSubmit={handleSendEmail}>
				<EmailInput
					name={'email'}
					value={inputValues.email}
					onChange={handleChange}
					pattern={EMAIL_REGEX}
					placeholder={'Укажите e-mail'}
					required
					autoComplete={'email'}
				/>
				<Button
					type={'primary'}
					htmlType={'submit'}
					disabled={!isValid || isLoading}>
					{isLoading ? (
						<span className={'loading'}>Проверка данных...</span>
					) : (
						'Восстановить'
					)}
				</Button>
				<span
					className={`${styles.error} text text_type_main-default text_color_error`}>
					{requestError}
				</span>
			</form>
			<div className={styles.form_footer}>
				<p
					className={`${styles.hint} text text_type_main-default text_color_inactive`}>
					Вспомнили пароль?{' '}
					<Link
						to={routes.LOGIN}
						className={`${styles.link} text text_color_accent`}>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ForgotPassword;
