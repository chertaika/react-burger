import React, { useEffect } from 'react';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './auth.module.css';
import { EMAIL_REGEX, routes } from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearError,
	getLoadingStatus,
	getUserError,
	login,
} from '@store/user-slice';
import useFormValidator from '@/hooks/useFormValidator';

const Login = () => {
	const dispatch = useDispatch();
	const userError = useSelector(getUserError);
	const { login: isLoading } = useSelector(getLoadingStatus);

	const { inputValues, isValid, handleChange } = useFormValidator({
		email: '',
		password: '',
	});

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(login(inputValues));
	};

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-medium'}>Вход</h2>
			<form className={styles.form} onSubmit={handleLogin}>
				<EmailInput
					name={'email'}
					value={inputValues.email}
					onChange={handleChange}
					pattern={EMAIL_REGEX}
					required
				/>
				<PasswordInput
					name={'password'}
					value={inputValues.password}
					onChange={handleChange}
					required
					minLength={6}
				/>
				<Button
					type={'primary'}
					htmlType={'submit'}
					disabled={!isValid || isLoading}>
					{isLoading ? <span className={'loading'}>Вход...</span> : 'Войти'}
				</Button>
				<span
					className={`${styles.error} text text_type_main-default text_color_error`}>
					{userError}
				</span>
			</form>
			<div className={styles.form_footer}>
				<p
					className={`${styles.hint} text text_type_main-default text_color_inactive`}>
					Вы — новый пользователь?{' '}
					<Link
						to={routes.REGISTER}
						className={`${styles.link} text text_color_accent`}>
						Зарегистрироваться
					</Link>
				</p>
				<p
					className={`${styles.hint} text text_type_main-default text_color_inactive`}>
					Забыли пароль?{' '}
					<Link
						to={routes.FORGOT_PASSWORD}
						className={`${styles.link} text text_color_accent`}>
						Восстановить пароль
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
