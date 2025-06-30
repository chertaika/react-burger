import { useState, JSX, FormEvent } from 'react';
import styles from '@pages/auth/auth.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@utils/constants';
import useFormValidator from '@/hooks/useFormValidator';
import { apiResetPassword } from '@utils/api';
import { TResetPassword } from '@utils/types';

const ResetPassword = (): JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const [requestError, setRequestError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { inputValues, errorMessages, isValid, handleChange } =
		useFormValidator<TResetPassword>({
			password: '',
			token: '',
		});

	const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
		setRequestError('');
		setIsLoading(true);
		e.preventDefault();
		try {
			await apiResetPassword(inputValues);
			navigate(routes.LOGIN);
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				setRequestError(error.message);
			} else {
				setRequestError('Неизвестная ошибка');
			}
		} finally {
			setIsLoading(false);
		}
	};

	if (location?.state?.from !== 'forgot-password') {
		return <Navigate to={routes.LOGIN} replace />;
	}

	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-medium mb-6'}>
				Восстановление пароля
			</h2>
			<form className={styles.form} onSubmit={handleResetPassword}>
				<PasswordInput
					name={'password'}
					value={inputValues.password}
					onChange={handleChange}
					required
					minLength={6}
					placeholder={'Введите новый пароль'}
					autoComplete={'new-password'}
					errorText={errorMessages.password}
				/>
				<Input
					name={'token'}
					value={inputValues.token}
					onChange={handleChange}
					placeholder={'Введите код из письма'}
					required
					error={!!errorMessages?.token && errorMessages?.token?.length > 0}
					errorText={errorMessages.token}
				/>
				<Button
					type={'primary'}
					htmlType={'submit'}
					disabled={!isValid || isLoading}>
					{isLoading ? (
						<span className={'loading'}>Сохранение...</span>
					) : (
						'Сохранить'
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

export default ResetPassword;
